import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";

const FileUploader = ({ onUploaded }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            const res = await axios.post("http://localhost:5000/api/upload/file", formData);
            onUploaded(res.data.url); // pass URL back to parent
            alert("File uploaded successfully ✅");
        } catch (err) {
            console.error("Upload Error", err);
            alert("Upload failed ❌");
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e) => {
        const f = e.target.files[0];
        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    return (
        <div className="bg-white p-4 rounded shadow text-center space-y-4">
            <label className="cursor-pointer">
                <input type="file" onChange={handleFileChange} hidden />
                <div className="flex flex-col items-center justify-center text-indigo-600 hover:text-indigo-800">
                    <FaCloudUploadAlt className="text-4xl" />
                    <span className="text-sm">Click to select a file (PDF/Image)</span>
                </div>
            </label>

            {preview && (
                <div className="text-xs text-gray-600 truncate">
                    <p>📄 {file.name}</p>
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
                {uploading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
};

export default FileUploader;