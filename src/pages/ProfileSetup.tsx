import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle, Camera, Upload } from 'lucide-react';

const ProfileSetup = () => {
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const role = location.state?.role || 'student';

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleContinue = () => {
        if (!name.trim()) {
            alert('Please enter your name');
            return;
        }

        // Store user profile data
        const userData = {
            email: 'user@yadalearn.com',
            name: name.trim(),
            firstName: name.trim().split(' ')[0],
            lastName: name.trim().split(' ').slice(1).join(' ') || '',
            imageUrl: profileImage || ''
        };

        localStorage.setItem('yadalearn-user', JSON.stringify(userData));
        localStorage.setItem('yadalearn-user-profile-image', profileImage || '');

        // Navigate to main onboarding
        navigate('/onboarding', { state: { role }, replace: true });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 mb-4">
                            <UserCircle className="h-10 w-10 text-purple-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome to YadaLearn!
                        </h1>
                        <p className="text-gray-600">Let's set up your profile</p>
                    </div>

                    {/* Profile Picture Upload */}
                    <div className="space-y-3">
                        <Label className="text-gray-700 font-semibold">Profile Picture (Optional)</Label>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center border-4 border-purple-200">
                                        <Camera className="h-12 w-12 text-purple-400" />
                                    </div>
                                )}
                                <label
                                    htmlFor="profile-upload"
                                    className="absolute bottom-0 right-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors shadow-lg"
                                >
                                    <Upload className="h-5 w-5 text-white" />
                                </label>
                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                                Click the upload button to add your photo
                            </p>
                        </div>
                    </div>

                    {/* Name Input */}
                    <div className="space-y-3">
                        <Label htmlFor="name" className="text-gray-700 font-semibold">
                            What's your name? <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
                            autoFocus
                        />
                    </div>

                    {/* Continue Button */}
                    <Button
                        onClick={handleContinue}
                        disabled={!name.trim()}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 rounded-xl shadow-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Continue →
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                        This information will be used across your YadaLearn experience
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetup;
