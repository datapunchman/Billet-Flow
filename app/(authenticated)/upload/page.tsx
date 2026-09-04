"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const uploadSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  material: z.string().min(1, "Material selection is required"),
  tolerance: z.string().min(1, "Tolerance is required"),
  notes: z.string().optional(),
});

type UploadFormData = z.infer<typeof uploadSchema>;

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      quantity: 1,
      material: "",
      tolerance: "",
    },
  });

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith(".step") || droppedFile.name.endsWith(".stp"))) {
      if (droppedFile.size <= 100 * 1024 * 1024) {
        setFile(droppedFile);
      } else {
        alert("File size must be less than 100MB");
      }
    } else {
      alert("Please upload a valid STEP file (.step or .stp)");
    }
  }, []);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size <= 100 * 1024 * 1024) {
        setFile(selectedFile);
      } else {
        alert("File size must be less than 100MB");
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  const onSubmit = async (data: UploadFormData) => {
    if (!file) {
      alert("Please upload a file");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setIsUploading(false);
      router.push("/estimate/est_123");
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Upload STEP File</h1>
        <p className="text-gray-400">
          Upload your CAD file and provide project details for instant estimate
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* File Upload Area */}
        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">File Upload</h2>

          {!file ? (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`
                border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
                ${
                  isDragging
                    ? "border-orange-500 bg-orange-500/5"
                    : "border-[#1f2937] hover:border-orange-500/50 hover:bg-[#1a1b1e]"
                }
              `}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Drop your STEP file here
              </h3>
              <p className="text-gray-400 mb-6">
                or click to browse from your computer
              </p>
              <label className="inline-block">
                <input
                  type="file"
                  accept=".step,.stp"
                  onChange={onFileSelect}
                  className="hidden"
                />
                <span className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all cursor-pointer inline-block">
                  Browse Files
                </span>
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: .step, .stp (Max 100MB)
              </p>
            </div>
          ) : (
            <div className="border border-[#1f2937]/50 rounded-2xl p-6 bg-[#1a1b1e]">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <File className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-white truncate">
                        {file.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 hover:bg-[#13141a] rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} />
                      <p className="text-sm text-gray-400">
                        Uploading... {uploadProgress}%
                      </p>
                    </div>
                  )}

                  {uploadProgress === 100 && !isUploading && (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Upload complete</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Details */}
        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Project Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                {...register("projectName")}
                className="w-full px-4 py-3 bg-[#1a1b1e] border border-[#1f2937]/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                placeholder="Enter project name"
              />
              {errors.projectName && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.projectName.message}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                className="w-full px-4 py-3 bg-[#1a1b1e] border border-[#1f2937]/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                placeholder="Enter quantity"
              />
              {errors.quantity && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Material */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Material *
              </label>
              <select
                {...register("material")}
                className="w-full px-4 py-3 bg-[#1a1b1e] border border-[#1f2937]/50 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors"
              >
                <option value="">Select material</option>
                <option value="aluminum-6061">Aluminum 6061</option>
                <option value="aluminum-7075">Aluminum 7075</option>
                <option value="stainless-304">Stainless Steel 304</option>
                <option value="stainless-316">Stainless Steel 316</option>
                <option value="mild-steel">Mild Steel</option>
                <option value="brass">Brass</option>
                <option value="copper">Copper</option>
              </select>
              {errors.material && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.material.message}
                </p>
              )}
            </div>

            {/* Tolerance */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tolerance *
              </label>
              <select
                {...register("tolerance")}
                className="w-full px-4 py-3 bg-[#1a1b1e] border border-[#1f2937]/50 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors"
              >
                <option value="">Select tolerance</option>
                <option value="standard">Standard (±0.005")</option>
                <option value="precision">Precision (±0.002")</option>
                <option value="tight">Tight (±0.001")</option>
              </select>
              {errors.tolerance && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.tolerance.message}
                </p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              {...register("notes")}
              rows={4}
              className="w-full px-4 py-3 bg-[#1a1b1e] border border-[#1f2937]/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
              placeholder="Add any special requirements or notes..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-3 bg-[#1a1b1e] hover:bg-[#1f2937] border border-[#1f2937]/50 text-white rounded-xl font-medium transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading || !file}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Processing..." : "Generate Estimate"}
          </button>
        </div>
      </form>
    </div>
  );
}
