// src/pages/ProfilePage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  User,
  Settings,
  Building,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Save,
  X,
  Bell,
  Shield,
  CreditCard,
  FileText,
  BarChart3,
  MessageSquare,
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

// أنواع البيانات
interface Company {
  id: number;
  name: string;
  description: string;
  logo?: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  isActive: boolean;
  createdAt: string;
  listingsCount: number;
}

interface UserListing {
  id: number;
  title: string;
  price: string;
  currency: string;
  status: 'active' | 'pending' | 'expired' | 'sold';
  views: number;
  favorites: number;
  messages: number;
  image: string;
  createdAt: string;
  companyId: number;
  companyName: string;
}

// بيانات وهمية
const mockCompanies: Company[] = [
  {
    id: 1,
    name: 'شركة الأحلام العقارية',
    description: 'متخصصون في العقارات الفاخرة والاستثمارية',
    logo: 'https://picsum.photos/seed/company1/100/100',
    phone: '+963 11 123 4567',
    email: 'info@dreams-realestate.com',
    website: 'www.dreams-realestate.com',
    address: 'دمشق - المزة - شارع الجلاء',
    isActive: true,
    createdAt: '2023-01-15',
    listingsCount: 12,
  },
  {
    id: 2,
    name: 'معرض النجوم للسيارات',
    description: 'بيع وشراء جميع أنواع السيارات الجديدة والمستعملة',
    logo: 'https://picsum.photos/seed/company2/100/100',
    phone: '+963 11 987 6543',
    email: 'sales@stars-cars.com',
    website: 'www.stars-cars.com',
    address: 'حلب - الفردوس - طريق الباب',
    isActive: true,
    createdAt: '2023-03-20',
    listingsCount: 8,
  },
];

const mockListings: UserListing[] = [
  {
    id: 1,
    title: 'شقة 3 غرف في المزة - إطلالة رائعة',
    price: '45,000,000',
    currency: 'ل.س',
    status: 'active',
    views: 234,
    favorites: 12,
    messages: 5,
    image: 'https://picsum.photos/seed/listing1/400/300',
    createdAt: '2024-01-10',
    companyId: 1,
    companyName: 'شركة الأحلام العقارية',
  },
  {
    id: 2,
    title: 'تويوتا كامري 2023 - حالة ممتازة',
    price: '85,000',
    currency: 'ل.س',
    status: 'active',
    views: 156,
    favorites: 8,
    messages: 3,
    image: 'https://picsum.photos/seed/listing2/400/300',
    createdAt: '2024-01-08',
    companyId: 2,
    companyName: 'معرض النجوم للسيارات',
  },
  {
    id: 3,
    title: 'فيلا في المالكي - حديقة واسعة',
    price: '120,000,000',
    currency: 'ل.س',
    status: 'pending',
    views: 89,
    favorites: 15,
    messages: 2,
    image: 'https://picsum.photos/seed/listing3/400/300',
    createdAt: '2024-01-05',
    companyId: 1,
    companyName: 'شركة الأحلام العقارية',
  },
];

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'companies' | 'settings'>('overview');
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [listings, setListings] = useState<UserListing[]>(mockListings);
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  // إحصائيات سريعة
  const stats = {
    totalListings: listings.length,
    activeListings: listings.filter(l => l.status === 'active').length,
    totalViews: listings.reduce((sum, l) => sum + l.views, 0),
    totalFavorites: listings.reduce((sum, l) => sum + l.favorites, 0),
    totalMessages: listings.reduce((sum, l) => sum + l.messages, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'sold': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'pending': return 'قيد المراجعة';
      case 'expired': return 'منتهي الصلاحية';
      case 'sold': return 'تم البيع';
      default: return status;
    }
  };

  const tabs = [
    { key: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { key: 'listings', label: 'إعلاناتي', icon: FileText },
    { key: 'companies', label: 'شركاتي', icon: Building },
    { key: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* شريط التنقل العلوي */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="font-medium">العودة للرئيسية</span>
            </Link>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse bg-green-50 px-3 py-1 rounded-full">
                <User className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">ملفي الشخصي</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* رأس الملف الشخصي */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-6 space-x-reverse">
            <div className="relative">
              <img
                src="https://ui-avatars.com/api/?name=أحمد محمد&background=10b981&color=fff&size=100"
                alt="الصورة الشخصية"
                className="w-20 h-20 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-green-600 text-white rounded-full p-1 hover:bg-green-700 transition-colors">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">أحمد محمد</h1>
              <p className="text-gray-600 mb-2">عضو منذ يناير 2023</p>
              <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Mail className="w-4 h-4" />
                  <span>ahmed.mohamed@email.com</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Phone className="w-4 h-4" />
                  <span>+963 11 123 4567</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <MapPin className="w-4 h-4" />
                  <span>دمشق، سوريا</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalListings}</div>
              <div className="text-sm text-gray-600">إعلان نشط</div>
            </div>
          </div>
        </div>

        {/* التبويبات */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 space-x-reverse px-6">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center space-x-2 space-x-reverse py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* تبويب النظرة العامة */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* الإحصائيات */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-blue-600">إجمالي الإعلانات</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900 mt-2">{stats.totalListings}</div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-green-600">الإعلانات النشطة</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900 mt-2">{stats.activeListings}</div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Eye className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-purple-600">إجمالي المشاهدات</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900 mt-2">{stats.totalViews}</div>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Heart className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-red-600">المفضلة</span>
                    </div>
                    <div className="text-2xl font-bold text-red-900 mt-2">{stats.totalFavorites}</div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <MessageSquare className="w-5 h-5 text-orange-600" />
                      <span className="text-sm text-orange-600">الرسائل</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-900 mt-2">{stats.totalMessages}</div>
                  </div>
                </div>

                {/* الإعلانات الأخيرة */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">الإعلانات الأخيرة</h3>
                    <button
                      onClick={() => setActiveTab('listings')}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      عرض الكل
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {listings.slice(0, 3).map(listing => (
                      <div key={listing.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm truncate">{listing.title}</h4>
                            <p className="text-green-600 font-bold text-sm">{listing.price} {listing.currency}</p>
                            <div className="flex items-center space-x-3 space-x-reverse text-xs text-gray-500 mt-1">
                              <span className="flex items-center space-x-1 space-x-reverse">
                                <Eye className="w-3 h-3" />
                                <span>{listing.views}</span>
                              </span>
                              <span className="flex items-center space-x-1 space-x-reverse">
                                <Heart className="w-3 h-3" />
                                <span>{listing.favorites}</span>
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(listing.status)}`}>
                                {getStatusText(listing.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* تبويب الإعلانات */}
            {activeTab === 'listings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">إعلاناتي ({listings.length})</h3>
                  <Link
                    to="/create"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 space-x-reverse"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إعلان جديد</span>
                  </Link>
                </div>

                <div className="space-y-4">
                  {listings.map(listing => (
                    <div key={listing.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4 space-x-reverse">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">{listing.title}</h4>
                              <p className="text-green-600 font-bold text-lg">{listing.price} {listing.currency}</p>
                              <p className="text-sm text-gray-600">{listing.companyName}</p>
                            </div>
                            
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(listing.status)}`}>
                                {getStatusText(listing.status)}
                              </span>
                              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Eye className="w-4 h-4" />
                              <span>{listing.views} مشاهدة</span>
                            </div>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Heart className="w-4 h-4" />
                              <span>{listing.favorites} مفضلة</span>
                            </div>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <MessageSquare className="w-4 h-4" />
                              <span>{listing.messages} رسالة</span>
                            </div>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(listing.createdAt).toLocaleDateString('ar-SA')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* تبويب الشركات */}
            {activeTab === 'companies' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">شركاتي ({companies.length})</h3>
                  <button
                    onClick={() => setShowAddCompany(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 space-x-reverse"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة شركة</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companies.map(company => (
                    <div key={company.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4 space-x-reverse mb-4">
                        <img
                          src={company.logo || `https://ui-avatars.com/api/?name=${company.name}&background=10b981&color=fff`}
                          alt={company.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">{company.name}</h4>
                              <p className="text-sm text-gray-600 mb-2">{company.description}</p>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  company.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {company.isActive ? 'نشطة' : 'غير نشطة'}
                                </span>
                                <span className="text-xs text-gray-500">{company.listingsCount} إعلان</span>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => setEditingCompany(company)}
                              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Phone className="w-4 h-4" />
                          <span>{company.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Mail className="w-4 h-4" />
                          <span>{company.email}</span>
                        </div>
                        {company.website && (
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Globe className="w-4 h-4" />
                            <span>{company.website}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <MapPin className="w-4 h-4" />
                          <span>{company.address}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* تبويب الإعدادات */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                {/* الإعدادات الشخصية */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">الإعدادات الشخصية</h3>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                        <input
                          type="text"
                          defaultValue="أحمد محمد"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                        <input
                          type="email"
                          defaultValue="ahmed.mohamed@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                        <input
                          type="tel"
                          defaultValue="+963 11 123 4567"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                        <input
                          type="text"
                          defaultValue="دمشق"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 space-x-reverse">
                      <Save className="w-4 h-4" />
                      <span>حفظ التغييرات</span>
                    </button>
                  </div>
                </div>

                {/* إعدادات التنبيهات */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">إعدادات التنبيهات</h3>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">تنبيهات الرسائل</h4>
                        <p className="text-sm text-gray-600">احصل على إشعار عند وصول رسالة جديدة</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">تنبيهات الإعلانات</h4>
                        <p className="text-sm text-gray-600">احصل على إشعار عند تغيير حالة إعلانك</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">التسويق</h4>
                        <p className="text-sm text-gray-600">احصل على عروض وأخبار الموقع</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* إعدادات الأمان */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">الأمان والخصوصية</h3>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <button className="w-full text-right p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">تغيير كلمة المرور</h4>
                          <p className="text-sm text-gray-600">آخر تغيير منذ 3 أشهر</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <button className="w-full text-right p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Eye className="w-5 h-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">إعدادات الخصوصية</h4>
                          <p className="text-sm text-gray-600">تحكم في من يمكنه رؤية معلوماتك</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <button className="w-full text-right p-4 bg-white rounded-lg border border-red-200 hover:bg-red-50 transition-colors flex items-center justify-between text-red-600">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Trash2 className="w-5 h-5" />
                        <div>
                          <h4 className="font-medium">حذف الحساب</h4>
                          <p className="text-sm">حذف نهائي لجميع البيانات</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;