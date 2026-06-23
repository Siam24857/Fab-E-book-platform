"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  BookOpen,
  UserPlus,
  ChevronRight,
  Users,
  PenTool,
  Check,
} from "lucide-react";
import { authClient } from "../lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: User Info, 2: Role Selection
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "reader",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");

    // Check password strength
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleNextStep = () => {
    // Validate step 1
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (error) {
        setError(error.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // Registration successful
      if (data) {
        
        router.push("/Login"); // Redirect to login page
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/Login",
      });
    } catch (err) {
      setError("Google login failed. Please try again.");
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    if (passwordStrength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Fair";
    if (passwordStrength <= 4) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-8 px-3 sm:py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[95%] sm:max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-7 md:p-10">
          {/* Logo and Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-5 sm:mb-6 md:mb-8"
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/"
                className="inline-flex items-center space-x-2 mb-3 sm:mb-4"
              >
                <BookOpen className="w-6 h-6 sm:w-7 md:w-8 sm:h-7 md:h-8 text-indigo-600" />
                <span className="text-xl sm:text-2xl font-bold text-gray-800">Fable</span>
              </Link>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2"
            >
              Create Account
            </motion.h2>
            <motion.p variants={itemVariants} className="text-sm sm:text-base text-gray-600">
              Join the Fable community today
            </motion.p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                  step >= 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div
                className={`w-8 sm:w-12 h-0.5 ${
                  step >= 2 ? "bg-indigo-600" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                  step >= 2
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-2.5 sm:p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs sm:text-sm"
            >
              {error}
            </motion.div>
          )}

          {step === 1 ? (
            /* Step 1: User Information */
            <motion.form
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4 sm:space-y-6"
            >
              {/* Full Name */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-1.5 sm:mt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] sm:text-xs text-gray-600 ml-2">
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Confirm Password */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && formData.password && (
                  <p
                    className={`text-[10px] sm:text-xs mt-1 ${
                      formData.password === formData.confirmPassword
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formData.password === formData.confirmPassword
                      ? "✓ Passwords match"
                      : "✗ Passwords do not match"}
                  </p>
                )}
              </motion.div>

              {/* Terms and Conditions */}
              <motion.div variants={itemVariants}>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={() => setAcceptedTerms(!acceptedTerms)}
                    className="mt-0.5 sm:mt-1 w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 flex-shrink-0"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-xs sm:text-sm text-gray-600"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-indigo-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-indigo-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </motion.div>

              {/* Next Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-2.5 sm:py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all font-medium text-sm sm:text-base flex items-center justify-center"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                </button>
              </motion.div>

              {/* Divider */}
              <motion.div
                variants={itemVariants}
                className="relative my-4 sm:my-6"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-3 sm:px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </motion.div>

              {/* Google Login Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-2.5 sm:py-3 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-gray-700">Sign up with Google</span>
                </button>
              </motion.div>

              {/* Login Link */}
              <motion.div
                variants={itemVariants}
                className="text-center mt-4 sm:mt-6"
              >
                <p className="text-xs sm:text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </motion.form>
          ) : (
            /* Step 2: Role Selection */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 sm:space-y-6"
            >
              <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Choose Your Role
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  How would you like to use Fable?
                </p>
              </motion.div>

              {/* Role Cards */}
              <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
                {/* Reader Role */}
                <div
                  onClick={() => handleRoleSelect("reader")}
                  className={`p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.role === "reader"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex-1 flex items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-800">
                          Reader
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          Discover, read, and purchase ebooks
                        </p>
                      </div>
                    </div>
                    {formData.role === "reader" && (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </div>

                {/* Writer Role */}
                <div
                  onClick={() => handleRoleSelect("writer")}
                  className={`p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.role === "writer"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex-1 flex items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-800">
                          Writer
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          Upload and sell your own ebooks
                        </p>
                      </div>
                    </div>
                    {formData.role === "writer" && (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2.5 sm:space-y-3">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-2.5 sm:py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Create Account
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-1.5 sm:py-2 px-4 text-gray-600 hover:text-gray-800 font-medium text-xs sm:text-sm"
                >
                  ← Go Back
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;