import React, { useEffect, useState } from "react";
import {
  User, Mail, Phone, MapPin, Calendar,
  Edit3, Save, X, Camera
} from "lucide-react";
import axios from "axios";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');

  const [userData, setUserData] = useState({
    id: null,
    fullName: '',
    company: '',
    address: '',
    email: '',
    phone: '',
    created_at: '',
    avatar: ''
  });

  const [tempData, setTempData] = useState(userData);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:7070/api/user/profile/${userId}`); // with full url it return json data, but if we teh url with api we get an html data.
      
      const data = response.data;

      if (!data) {
        console.log("there is no data hhh");
      }else{
        console.log("the data is hamdllah", data);
      }

      setUserData(response.data);
      setTempData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching user data", err);
      setError("Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(userData);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      console.log('data going sent to the backend: ', tempData);
      console.log('user id: ', userId);

      await axios.put(`http://localhost:7070/api/user/profile/${userId}`, tempData);
      setUserData(tempData);
      setIsEditing(false);
      setError(null);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update the profile", err);
      setError("Failed to update the profile.");
      alert("Failed to update the profile, please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTempData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <X size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchUserData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">User Profile</h1>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {userData.avatar ? (
                  <img src={userData.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <User size={32} className="text-blue-600" />
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                  <Camera size={14} />
                </button>
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{userData.fullName}</h2>
            <p className="text-gray-600 mb-4">{userData.company}</p>
            <p className="text-sm text-gray-500">{userData.address}</p>
            <div className="mt-6 space-y-4 text-left">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} />
                <span className="text-sm">{userData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={16} />
                <span className="text-sm">{userData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={16} />
                <span className="text-sm">{userData.address}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar size={16} />
                <span className="text-sm">
                  Joined {new Date(userData.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'personal', label: 'Personal Info' },
                  { id: 'security', label: 'Security' },
                  { id: 'preferences', label: 'Preferences' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userData.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={tempData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userData.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userData.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userData.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Future tabs: security, preferences */}
              {activeTab === 'security' && (
                <p className="text-sm text-gray-500">Security settings will be here.</p>
              )}
              {activeTab === 'preferences' && (
                <p className="text-sm text-gray-500">Preferences settings will be here.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
