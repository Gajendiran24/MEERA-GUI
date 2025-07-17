import { useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";

const FileUploader = ({ onUploaded }) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "meera_unsigned"); // ✅ your unsigned upload preset
            formData.append("folder", "folder/sub-folder");      // ✅ optional folder

            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dqljhvaje/upload",
                formData
            );
            const url = res.data.secure_url;
            onUploaded(url);
        } catch (err) {
            alert("Upload failed ❌");
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0.6, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center border border-dashed border-indigo-400 p-6 rounded-lg bg-indigo-50"
        >
            <FiUploadCloud className="text-4xl text-indigo-600 mb-2 text-center" />
            <p className="text-indigo-700 font-semibold">Choose a file to upload</p>
            <input
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                className="mt-3 cursor-pointer"
            />
            {uploading && <p className="text-sm text-gray-600 mt-2">Uploading...</p>}
        </motion.div>
    );
};

export default FileUploader;