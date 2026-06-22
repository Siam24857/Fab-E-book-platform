'use client';

import React, { useState } from 'react';
import { 
    ArrowUpToLine, 
    Factory, 
    ArrowRight, 
    Pencil, 
    ChevronDown, 
    X,
    Loader2,
    AlertCircle,
    CheckCircle,
    BookOpen,
    User,
    Hash,
    DollarSign,
    Image as ImageIcon,
    FileText,
    List,
    Tag
} from 'lucide-react';
import { Updatekbooks } from '@/app/lib/Action/Updatebooks';

 

export default function Editepaghe({ bookid, id, companys, recuiterdata }) {
    // Core State
    const [company, setCompany] = useState(companys);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    // Cloudinary Upload States
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // Cloudinary Upload Handler
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, logo: "File size must be less than 5MB" }));
            return;
        }

        // Validate file type
        const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setErrors(prev => ({ ...prev, logo: "Please upload a valid image (PNG, JPG, GIF, WEBP)" }));
            return;
        }

        try {
            setIsUploading(true);
            setErrors(prev => ({ ...prev, logo: null }));

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "ebook_uploads");

            const res = await fetch(
                "https://api.cloudinary.com/v1_1/digdoji2h/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (!data.secure_url) {
                throw new Error(data.error?.message || "Upload failed");
            }

            setImageUrl(data.secure_url);

        } catch (err) {
            console.error(err);
            setErrors(prev => ({ ...prev, logo: err.message || "Upload failed" }));
        } finally {
            setIsUploading(false);
        }
    };

    // Remove uploaded image
    const removeImage = () => {
        setImageUrl('');
        document.getElementById('logoInput').value = '';
    };

    // Submit Form Data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        
        const formData = new FormData(e.currentTarget);
        
        const title = formData.get('title')?.trim();
        const writer = formData.get('writer')?.trim();
        
        const description = formData.get('description')?.trim();
        const content = formData.get('content')?.trim();
        const price = formData.get('price');
        const genre = formData.get('genre');

        // Validation
        const newErrors = {};
        if (!title) newErrors.title = "Title is required";
        if (!writer) newErrors.writer = "Writer name is required";
         
        if (!price || isNaN(price)) newErrors.price = "Valid price is required";
        if (price && parseFloat(price) < 0) newErrors.price = "Price must be greater than 0";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }
           
        // Prepare ebook data
        const ebookData = {
            title: title,
            writer: writer,
            writerId: id,
            cover: imageUrl || (company?.cover || ''),
            description: description || "A fascinating story about discovery and adventure...",
            content: content || "Chapter 1: The Beginning...",
            price: parseFloat(price) || 9.99,
            genre: genre || "Fantasy",
            status: "Available",
            uploadedAt: new Date().toISOString().split("T")[0],
            isPurchased: false,
            roomId: recuiterdata?.id,
            companyId: company?._id || null
        };

        try {
            const payload = await Updatekbooks(bookid, ebookData);
            
            if (payload?.success || payload?.insertedId) {
                setCompany(ebookData);
                setErrors({});
                setIsEditing(false);
                document.getElementById('logoInput').value = '';
                setImageUrl('');
                setSuccessMessage("Ebook Created Successfully! 🎉");
                setTimeout(() => setSuccessMessage(''), 5000);
            } else {
                throw new Error(payload?.error || "Failed to save ebook");
            }
        } catch (error) {
            console.error("Error saving ebook:", error);
            setErrors(prev => ({ ...prev, submit: error.message || "Failed to save ebook" }));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Cancel Edit
    const cancelEdit = () => {
        setIsEditing(false);
        setImageUrl(company?.cover || '');
        setErrors({});
        setSuccessMessage('');
        document.getElementById('logoInput').value = '';
    };

    // Start Registration
    const startRegistration = () => {
        setImageUrl('');
        setIsEditing(true);
        setErrors({});
        setSuccessMessage('');
    };

    // Start Editing
    const startEditing = () => {
        setImageUrl(company?.cover || '');
        setIsEditing(true);
        setErrors({});
        setSuccessMessage('');
    };

    // Genre options with icons
    const genreOptions = [
        { value: 'Fantasy', label: 'Fantasy', icon: '📖' },
        { value: 'Fiction', label: 'Fiction', icon: '📚' },
        { value: 'Science', label: 'Science', icon: '🔬' },
        { value: 'Technology', label: 'Technology', icon: '💻' },
        { value: 'Biography', label: 'Biography', icon: '👤' },
        { value: 'Romance', label: 'Romance', icon: '❤️' },
        { value: 'Horror', label: 'Horror', icon: '👻' },
    ];

    // Empty State
    if (!company?._id && !isEditing) {
        return (
            <div className="max-w-2xl mx-auto my-12 bg-white border border-gray-200 rounded-2xl p-10 text-center space-y-6 shadow-sm">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto border border-blue-100">
                    <BookOpen size={28} className="text-blue-600" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-900">Create Your First Ebook</h2>
                    <p className="text-gray-600 max-w-sm mx-auto">
                        Start your publishing journey by creating your first ebook. Fill in the details and share your story with the world.
                    </p>
                </div>
                <button 
                    onClick={startRegistration}
                    className="bg-blue-600 text-white font-semibold hover:bg-blue-700 rounded-xl px-8 py-3 transition-all flex items-center gap-2 mx-auto shadow-md hover:shadow-lg"
                >
                    Create Ebook <ArrowRight size={18} />
                </button>
            </div>
        );
    }

    // Display View Mode
    if (company && !isEditing) {
        return (
            <div className="max-w-4xl mx-auto my-8 bg-white border border-gray-200 rounded-2xl p-8 space-y-8 shadow-sm">
                {successMessage && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-3">
                        <CheckCircle size={18} className="flex-shrink-0" />
                        <span>{successMessage}</span>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-6">
                        {company.cover ? (
                            <img 
                                src={company.cover} 
                                alt={company.title} 
                                className="w-24 h-32 rounded-xl object-cover bg-gray-100 border border-gray-200 shadow-sm"
                            />
                        ) : (
                            <div className="w-24 h-32 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200">
                                <BookOpen size={32} className="text-gray-400" />
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl font-bold text-gray-900">{company.title}</h1>
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${company.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {company.status || 'Available'}
                                </span>
                            </div>
                            <p className="text-gray-600 mt-1 flex items-center gap-1">
                                <User size={14} className="text-gray-400" />
                                <span>By: <span className="font-medium">{company.writer}</span></span>
                            </p>
                            <p className="text-gray-500 text-sm flex items-center gap-4 mt-0.5">
                                <span className="flex items-center gap-1">
                                    <Tag size={14} className="text-gray-400" />
                                    {company.genre || 'Fantasy'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <DollarSign size={14} className="text-gray-400" />
                                    ${company.price}
                                </span>
                                
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={startEditing}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-5 py-2.5 font-medium flex items-center gap-2 transition-all"
                    >
                        <Pencil size={16} /> Edit Ebook
                    </button>
                </div>

                {company.description && (
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <FileText size={14} /> Description
                        </h3>
                        <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                {company.description}
                            </p>
                        </div>
                    </div>
                )}

                {company.content && (
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <List size={14} /> Content Preview
                        </h3>
                        <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl max-h-48 overflow-y-auto">
                            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                {company.content.length > 500 ? `${company.content.substring(0, 500)}...` : company.content}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Edit/Create Form View
    return (
        <div className="max-w-3xl mx-auto my-8 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-3">
                    <CheckCircle size={18} className="flex-shrink-0" />
                    <span>{successMessage}</span>
                </div>
            )}

            {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <span>{errors.submit}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                        <BookOpen size={24} className="text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            {company ? 'Update Ebook' : 'Create New Ebook'}
                        </h2>
                        <span className="text-sm text-gray-400">| Fill in the details</span>
                    </div>

                    {/* Row 1: Title + Writer Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <BookOpen size={14} className="text-gray-400" />
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input 
                                name="title" 
                                defaultValue={company?.title || ''} 
                                placeholder="Enter ebook title"
                                className={`w-full bg-gray-50 border ${errors.title ? 'border-red-400' : 'border-gray-200'} text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition`}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle size={12} /> {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <User size={14} className="text-gray-400" />
                                Writer Name <span className="text-red-500">*</span>
                            </label>
                            <input 
                                name="writer" 
                                defaultValue={company?.writer || ''} 
                                placeholder="e.g. John Doe"
                                className={`w-full bg-gray-50 border ${errors.writer ? 'border-red-400' : 'border-gray-200'} text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition`}
                            />
                            {errors.writer && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle size={12} /> {errors.writer}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Row 2: Writer ID + Genre */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <Hash size={14} className="text-gray-400" />
                                Writer ID <span className="text-red-500">*</span>
                            </label>
                            <input 
                                name="writerId" 
                                defaultValue={company?.writerId || ''} 
                                placeholder="e.g. W001"
                                className={`w-full bg-gray-50 border ${errors.writerId ? 'border-red-400' : 'border-gray-200'} text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition`}
                            />
                            {errors.writerId && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle size={12} /> {errors.writerId}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <Tag size={14} className="text-gray-400" />
                                Genre
                            </label>
                            <select 
                                name="genre" 
                                defaultValue={company?.genre || 'Fantasy'}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition appearance-none"
                            >
                                {genreOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.icon} {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Row 3: Price + Cover Upload */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <DollarSign size={14} className="text-gray-400" />
                                Price (USD) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input 
                                    type="number" 
                                    step="0.01" 
                                    name="price" 
                                    defaultValue={company?.price || ''} 
                                    placeholder="0.00"
                                    className={`w-full bg-gray-50 border ${errors.price ? 'border-red-400' : 'border-gray-200'} text-gray-900 rounded-xl pl-8 pr-4 py-3 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition`}
                                />
                            </div>
                            {errors.price && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle size={12} /> {errors.price}
                                </p>
                            )}
                        </div>

                        {/* Cover Image Upload */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <ImageIcon size={14} className="text-gray-400" />
                                Cover Image
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <input 
                                        id="logoInput"
                                        type="file" 
                                        accept="image/png, image/jpeg, image/gif, image/webp" 
                                        onChange={handleImageUpload} 
                                        className="hidden" 
                                    />
                                    <label 
                                        htmlFor="logoInput"
                                        className={`w-20 h-24 border-2 border-dashed ${imageUrl ? 'border-green-400' : 'border-gray-300'} hover:border-blue-400 bg-gray-50 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all group`}
                                    >
                                        {imageUrl ? (
                                            <div className="relative w-full h-full">
                                                <img src={imageUrl} alt="Cover Preview" className="w-full h-full object-cover rounded-xl" />
                                                <button 
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-md"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : isUploading ? (
                                            <div className="flex flex-col items-center gap-1">
                                                <Loader2 size={20} className="text-blue-600 animate-spin" />
                                                <span className="text-xs text-gray-500">Uploading...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <ArrowUpToLine size={20} className="text-gray-400 group-hover:text-blue-500 transition" />
                                                <span className="text-xs text-gray-400 mt-1">Upload</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">
                                        {imageUrl ? '✅ Cover uploaded' : 'Click to upload cover image'}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, GIF up to 5MB</p>
                                    {errors.logo && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                            <AlertCircle size={12} /> {errors.logo}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 4: Description */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <FileText size={14} className="text-gray-400" />
                            Description
                        </label>
                        <textarea
                            name="description"
                            defaultValue={company?.description || ''}
                            placeholder="Write a brief description about your ebook..."
                            rows={4}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-4 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
                        />
                    </div>

                    {/* Row 5: Full Content */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <List size={14} className="text-gray-400" />
                            Full Content
                        </label>
                        <textarea
                            name="content"
                            defaultValue={company?.content || ''}
                            placeholder="Write your ebook content here..."
                            rows={8}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-4 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
                        />
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-wrap justify-end gap-3 pt-6 border-t border-gray-200">
                    {company && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl font-medium transition border border-gray-300 flex items-center gap-2"
                        >
                            <X size={16} /> Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white font-semibold hover:bg-blue-700 rounded-xl px-8 py-3 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                {company ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            company ? 'Update Ebook' : 'Create Ebook'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}