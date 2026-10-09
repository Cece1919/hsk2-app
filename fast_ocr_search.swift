import Foundation
import Vision
import AppKit

let args = CommandLine.arguments
guard args.count > 1 else { exit(1) }
let dirPath = args[1]

let fileManager = FileManager.default
let files = try! fileManager.contentsOfDirectory(atPath: dirPath).filter { $0.hasSuffix(".png") }

let targetChars = ["过", "商", "场", "进", "去", "条", "裤", "子", "白", "色", "因", "为", "试", "红", "所", "以", "书", "包", "绿", "黑", "更", "颜"]

for file in files {
    let url = URL(fileURLWithPath: dirPath + "/" + file)
    guard let image = NSImage(contentsOf: url) else { continue }
    var rect = CGRect(x: 0, y: 0, width: image.size.width, height: image.size.height)
    guard let cgImage = image.cgImage(forProposedRect: &rect, context: nil, hints: nil) else { continue }
    
    let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    let request = VNRecognizeTextRequest()
    request.recognitionLanguages = ["zh-Hans", "vi-VN", "en-US"]
    
    try? requestHandler.perform([request])
    
    if let results = request.results {
        let text = results.compactMap { $0.topCandidates(1).first?.string }.joined(separator: "\n")
        for char in targetChars {
            if text.contains(char) {
                print("CHAR_HIT|\(char)|\(file)|\(text.replacingOccurrences(of: "\n", with: " "))")
            }
        }
    }
}
