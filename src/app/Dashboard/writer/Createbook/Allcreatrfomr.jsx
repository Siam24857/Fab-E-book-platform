'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    Tag,
    Sparkles,
    Rocket
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { creatcompnay } from '@/app/lib/Action/Creatfomr';
import { useSession } from '@/app/lib/auth-client';

export default function EbookCreateForm({ token, companys, recuiterdata }) {
    const { data: session, isPending, error } = useSession();
    
    // Core State
    const [company, setCompany] = useState(companys);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [touchedFields, setTouchedFields] = useState({});
    
    // Cloudinary Upload States
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.2 }
        }
    };

    // Cloudinary Upload Handler
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            const errorMsg = "File size must be less than 5MB";
            setErrors(prev => ({ ...prev, logo: errorMsg }));
            toast.error(errorMsg);
            return;
        }

        // Validate file type
        const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            const errorMsg = "Please upload a valid image (PNG, JPG, GIF, WEBP)";
            setErrors(prev => ({ ...prev, logo: errorMsg }));
            toast.error(errorMsg);
            return;
        }

        const uploadToast = toast.loading('Uploading cover image...');

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
            toast.success('Cover image uploaded successfully!', {
                id: uploadToast,
                duration: 3000,
            });

        } catch (err) {
            console.error(err);
            const errorMsg = err.message || "Upload failed";
            setErrors(prev => ({ ...prev, logo: errorMsg }));
            toast.error(errorMsg, {
                id: uploadToast,
                duration: 4000,
            });
        } finally {
            setIsUploading(false);
        }
    };

    // Remove uploaded image
    const removeImage = () => {
        setImageUrl('');
        document.getElementById('logoInput').value = '';
        toast.success('Image removed');
    };

    // Handle field blur for validation
    const handleBlur = (field) => {
        setTouchedFields(prev => ({ ...prev, [field]: true }));
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
            Object.values(newErrors).forEach(error => toast.error(error));
            return;
        }
           
        // Prepare ebook data
        const ebookData = {
            title: title,
            writer: writer,
            writerId: session?.id || '',
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

        const submitToast = toast.loading(company ? 'Updating ebook...' : 'Creating ebook...');

        try {
            const payload = await creatcompnay(token, ebookData);
            
            if (payload?.success || payload?.insertedId) {
                setCompany(ebookData);
                setErrors({});
                setIsEditing(false);
                document.getElementById('logoInput').value = '';
                setImageUrl('');
                setSuccessMessage(company ? "Ebook Updated Successfully! ✨" : "Ebook Created Successfully! 🎉");
                
                toast.success(company ? 'Ebook updated successfully! ✨' : 'Ebook created successfully! 🎉', {
                    id: submitToast,
                    duration: 4000,
                });
                
                setTimeout(() => setSuccessMessage(''), 5000);
            } else {
                throw new Error(payload?.error || "Failed to save ebook");
            }
        } catch (error) {
            console.error("Error saving ebook:", error);
            const errorMsg = error.message || "Failed to save ebook";
            setErrors(prev => ({ ...prev, submit: errorMsg }));
            toast.error(errorMsg, {
                id: submitToast,
                duration: 5000,
            });
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
        setTouchedFields({});
        document.getElementById('logoInput').value = '';
    };

    // Start Registration
    const startRegistration = () => {
        setImageUrl('');
        setIsEditing(true);
        setErrors({});
        setSuccessMessage('');
        setTouchedFields({});
    };

    // Start Editing
    const startEditing = () => {
        setImageUrl(company?.cover || '');
        setIsEditing(true);
        setErrors({});
        setSuccessMessage('');
        setTouchedFields({});
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
            <>
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#1f2430',
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10b981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
                <motion.div 
                    className="max-w-2xl mx-auto my-12"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div 
                        className="bg-white border border-gray-200 rounded-2xl p-10 text-center space-y-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        variants={cardVariants}
                    >
                        <motion.div 
                            className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto border border-blue-100"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <BookOpen size={28} className="text-blue-600" />
                        </motion.div>
                        <div className="space-y-3">
                            <motion.h2 
                                className="text-2xl font-bold text-gray-900"
                                variants={itemVariants}
                            >
                                Create Your Ebook
                            </motion.h2>
                            <motion.p 
                                className="text-gray-600 max-w-sm mx-auto"
                                variants={itemVariants}
                            >
                                Start your publishing journey by creating your first ebook. 
                                Fill in the details and share your story with the world.
                            </motion.p>
                        </div>
                        <motion.button 
                            onClick={startRegistration}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 rounded-xl px-8 py-3 transition-all flex items-center gap-2 mx-auto shadow-md hover:shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            variants={itemVariants}
                        >
                            Create Ebook <Rocket size={18} />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </>
        );
    }

    // Display View Mode
    if (company && !isEditing) {
        return (
            <>
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#1f2430',
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        },
                    }}
                />
                <motion.div 
                    className="max-w-4xl mx-auto my-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div 
                        className="bg-white border border-gray-200 rounded-2xl p-8 space-y-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        variants={cardVariants}
                    >
                        {successMessage && (
                            <motion.div 
                                className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-3"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <CheckCircle size={18} className="flex-shrink-0" />
                                <span>{successMessage}</span>
                            </motion.div>
                        )}

                        <motion.div 
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-6">
                                {company.cover ? (
                                    <motion.img 
                                        src={company.cover} 
                                        alt={company.title} 
                                        className="w-24 h-32 rounded-xl object-cover bg-gray-100 border border-gray-200 shadow-sm"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    />
                                ) : (
                                    <div className="w-24 h-32 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200">
                                        <BookOpen size={32} className="text-gray-400" />
                                    </div>
                                )}
                                <div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h1 className="text-2xl font-bold text-gray-900">{company.title}</h1>
                                        <motion.span 
                                            className={`text-xs px-3 py-1 rounded-full font-medium ${company.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {company.status || 'Available'}
                                        </motion.span>
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
                            <motion.button 
                                onClick={startEditing}
                                className="border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-5 py-2.5 font-medium flex items-center gap-2 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Pencil size={16} /> Edit Ebook
                            </motion.button>
                        </motion.div>

                        {company.description && (
                            <motion.div className="space-y-3" variants={itemVariants}>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                    <FileText size={14} /> Description
                                </h3>
                                <motion.div 
                                    className="bg-gray-50 border border-gray-200 p-5 rounded-xl"
                                    whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                        {company.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}

                        {company.content && (
                            <motion.div className="space-y-3" variants={itemVariants}>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                    <List size={14} /> Content Preview
                                </h3>
                                <motion.div 
                                    className="bg-gray-50 border border-gray-200 p-5 rounded-xl max-h-48 overflow-y-auto"
                                    whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                        {company.content.length > 500 ? `${company.content.substring(0, 500)}...` : company.content}
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </>
        );
    }

    // Edit/Create Form View
    return (
        <>
            <Toaster 
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#1f2430',
                        color: '#fff',
                        borderRadius: '12px',
                        padding: '16px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
            <motion.div 
                className="max-w-3xl mx-auto my-8"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div 
                    className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    variants={cardVariants}
                >
                    {successMessage && (
                        <motion.div 
                            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-3"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <CheckCircle size={18} className="flex-shrink-0" />
                            <span>{successMessage}</span>
                        </motion.div>
                    )}

                    {errors.submit && (
                        <motion.div 
                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                            <span>{errors.submit}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <motion.div className="space-y-6" variants={itemVariants}>
                            <motion.div 
                                className="flex items-center gap-3 border-b border-gray-200 pb-4"
                                variants={itemVariants}
                            >
                                <BookOpen size={24} className="text-blue-600" />
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {company ? 'Update Ebook' : 'Create New Ebook'}
                                </h2>
                                <span className="text-sm text-gray-400">| Fill in the details</span>
                            </motion.div>

                            {/* Row 1: Title + Writer Name */}
                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                variants={itemVariants}
                            >
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <BookOpen size={14} className="text-gray-400" />
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        name="title" 
                                        defaultValue={company?.title || ''} 
                                        placeholder="Enter ebook title"
                                        onBlur={() => handleBlur('title')}
                                        className={`w-full bg-gray-50 border ${errors.title && touchedFields.title ? 'border-red-400' : 'border-gray-200'} text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition`}
                                    />
                                    <AnimatePresence>
                                        {errors.title && touchedFields.title && (
                                            <motion.p 
                                                className="text-red-500 text-xs mt-1 flex items-center gap-1"
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                            >
                                                <AlertCircle size={12} /> {errors.title}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
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
                                        onBlur={() => handleBlur('writer')}
                                        className={`w-full bg-gray-50 border ${errors.writer && touchedFields.writer ? 'border-red-400' : 'border-gray-200'} text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition`}
                                    />
                                    <AnimatePresence>
                                        {errors.writer && touchedFields.writer && (
                                            <motion.p 
                                                className="text-red-500 text-xs mt-1 flex items-center gap-1"
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                            >
                                                <AlertCircle size={12} /> {errors.writer}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Row 2: Writer ID + Genre */}
                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                variants={itemVariants}
                            >
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <Hash size={14} className="text-gray-400" />
                                        Writer ID <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        name="writerId" 
                                        defaultValue={session?.id || company?.writerId || ''} 
                                        placeholder="e.g. W001"
                                        readOnly={!!session?.id}
                                        className={`w-full bg-gray-50 border ${errors.writerId && touchedFields.writerId ? 'border-red-400' : 'border-gray-200'} text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition ${session?.id ? 'cursor-not-allowed opacity-70' : ''}`}
                                    />
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
                            </motion.div>

                            {/* Row 3: Price + Cover Upload */}
                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                variants={itemVariants}
                            >
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
                                            onBlur={() => handleBlur('price')}
                                            className={`w-full bg-gray-50 border ${errors.price && touchedFields.price ? 'border-red-400' : 'border-gray-200'} text-gray-900 rounded-xl pl-8 pr-4 py-3 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition`}
                                        />
                                    </div>
                                    <AnimatePresence>
                                        {errors.price && touchedFields.price && (
                                            <motion.p 
                                                className="text-red-500 text-xs mt-1 flex items-center gap-1"
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                            >
                                                <AlertCircle size={12} /> {errors.price}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Cover Image Upload */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <ImageIcon size={14} className="text-gray-400" />
                                        Cover Image
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <motion.div 
                                            className="relative"
                                            whileHover={{ scale: 1.02 }}
                                        >
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
                                                        <motion.button 
                                                            type="button"
                                                            onClick={removeImage}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-md"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <X size={14} />
                                                        </motion.button>
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
                                        </motion.div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600">
                                                {imageUrl ? '✅ Cover uploaded' : 'Click to upload cover image'}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, GIF up to 5MB</p>
                                            <AnimatePresence>
                                                {errors.logo && (
                                                    <motion.p 
                                                        className="text-red-500 text-xs mt-1 flex items-center gap-1"
                                                        initial={{ opacity: 0, y: -5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -5 }}
                                                    >
                                                        <AlertCircle size={12} /> {errors.logo}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Row 4: Description */}
                            <motion.div className="space-y-1.5" variants={itemVariants}>
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
                            </motion.div>

                            {/* Row 5: Full Content */}
                            <motion.div className="space-y-1.5" variants={itemVariants}>
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
                            </motion.div>
                        </motion.div>

                        {/* Form Actions */}
                        <motion.div 
                            className="flex flex-wrap justify-end gap-3 pt-6 border-t border-gray-200"
                            variants={itemVariants}
                        >
                            {company && (
                                <motion.button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl font-medium transition border border-gray-300 flex items-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <X size={16} /> Cancel
                                </motion.button>
                            )}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 rounded-xl px-8 py-3 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        {company ? 'Updating...' : 'Creating...'}
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={18} />
                                        {company ? 'Update Ebook' : 'Create Ebook'}
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>
        </>
    );
}