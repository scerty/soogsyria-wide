// src/pages/AlertsPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Search,
  Filter,
  MoreVertical,
  Star,
  Archive,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  Car,
  Home,
  Heart,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Info,
  ArrowRight,
  Settings,
  Plus,
  Edit3,
} from 'lucide-react';

// أنواع التنبيهات
type AlertType = 'price_drop' | 'new_listing' | 'saved_search' | 'message' | 'favorite' | 'system';

interface Alert {
  id: number;
  type: AlertType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  listingId?: number;
  listingTitle?: string;
  listingImage?: string;
  oldPrice?: string;
  newPrice?: string;
  location?: string;
  actionUrl?: string;
}

// بيانات وهمية للتنبيهات
const mockAlerts: Alert[] = [
  {
    id: 1,
    type: 'price_drop',
    title: 'انخفاض في السعر',
    description: 'انخفض سعر السيارة التي تتابعها بمقدار 5,000 ل.س',
    timestamp: '10 دقائق',
    isRead: false,
    isStarred: true,
    isArchived: false,
    listingId: 101,
    listingTitle: 'تويوتا كامري 2023 - حالة ممتازة',
    listingImage: 'https://picsum.photos/seed/car1/400/300',
    oldPrice: '90,000 ل.س',
    newPrice: '85,000 ل.س',
    location: 'دمشق',
    actionUrl: '/listings/101',
  },
  {
    id: 2,
    type: 'new_listing',
    title: 'إعلان جديد يطابق بحثك',
    description: 'تم نشر شقة جديدة في المزة تطابق معايير البحث المحفوظة لديك',
    timestamp: '30 دقيقة',
    isRead: false,
    isStarred: false,
    isArchived: false,
    listingId: 102,
    listingTitle: 'شقة 3 غرف في المزة - إطلالة رائعة',
    listingImage: 'https://picsum.photos/seed/apartment1/400/300',
    location: 'دمشق - المزة',
    actionUrl: '/listings/102',
  },
  {
    id: 3,
    type: 'message',
    title: 'رسالة جديدة',
    description: 'أحمد محمد أرسل لك رسالة حول إعلان السيارة',
    timestamp: '1 ساعة',
    isRead: true,
    isStarred: false,
    isArchived: false,
    listingId: 101,
    listingTitle: 'تويوتا كامري 2023',
    actionUrl: '/messages',
  },
  {
    id: 4,
    type: 'favorite',
    title: 'إعلان مفضل متاح مرة أخرى',
    description: 'العقار الذي أضفته للمفضلة أصبح متاحاً للبيع مرة أخرى',
    timestamp: '2 ساعة',
    isRead: true,
    isStarred: true,
    isArchived: false,
    listingId: 103,
    listingTitle: 'فيلا في المالكي - حديقة واسعة',
    listingImage: 'https://picsum.photos/seed/villa1/400/300',
    location: 'دمشق - المالكي',
    actionUrl: '/listings/103',
  },
  {
    id: 5,
    type: 'saved_search',
    title: 'نتائج جديدة لبحثك المحفوظ',
    description: 'وجدنا 3 إعلانات جديدة تطابق بحثك "سيارات هيونداي 2020-2023"',
    timestamp: '3 ساعات',
    isRead: true,
    isStarred: false,
    isArchived: false,
    actionUrl: '/search?saved=hyundai-2020-2023',
  },
  {
    id: 6,
    type: 'system',
    title: 'تحديث في سياسة الخصوصية',
    description: 'تم تحديث سياسة الخصوصية وشروط الاستخدام. يرجى مراجعتها.',
    timestamp: '1 يوم',
    isRead: false,
    isStarred: false,
    isArchived: false,
    actionUrl: '/privacy-policy',
  },
  {
    id: 7,
    type: 'price_drop',
    title: 'انخفاض كبير في السعر',
    description: 'انخفض سعر الشقة بمقدار 2,000,000 ل.س - فرصة ممتازة!',
    timestamp: '2 أيام',
    isRead: true,
    isStarred: false,
    isArchived: false,
    listingId: 104,
    listingTitle: 'شقة 4 غرف في أبو رمانة',
    listingImage: 'https://picsum.photos/seed/apartment2/400/300',
    oldPrice: '50,000,000 ل.س',
    newPrice: '48,000,000 ل.س',
    location: 'دمشق - أبو رمانة',
    actionUrl: '/listings/104',
  },
];

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'starred' | 'price_drop' | 'new_listing'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // فلترة التنبيهات
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.listingTitle?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterType === 'all' ||
      (filterType === 'unread' && !alert.isRead) ||
      (filterType === 'starred' && alert.isStarred) ||
      (filterType === 'price_drop' && alert.type === 'price_drop') ||
      (filterType === 'new_listing' && alert.type === 'new_listing');
    
    return matchesSearch && matchesFilter && !alert.isArchived;
  });

  // إحصائيات التنبيهات
  const unreadCount = alerts.filter(alert => !alert.isRead && !alert.isArchived).length;
  const starredCount = alerts.filter(alert => alert.isStarred && !alert.isArchived).length;
  const priceDropCount = alerts.filter(alert => alert.type === 'price_drop' && !alert.isArchived).length;

  // دوال التفاعل
  const markAsRead = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  const toggleStar = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isStarred: !alert.isStarred } : alert
    ));
  };

  const archiveAlert = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isArchived: true } : alert
    ));
  };

  const deleteAlert = (alertId: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  // أيقونات أنواع التنبيهات
  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'price_drop': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'new_listing': return <Plus className="w-5 h-5 text-blue-600" />;
      case 'saved_search': return <Search className="w-5 h-5 text-purple-600" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-orange-600" />;
      case 'favorite': return <Heart className="w-5 h-5 text-red-600" />;
      case 'system': return <Info className="w-5 h-5 text-gray-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

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
                <Bell className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">التنبيهات</span>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </div>
              <Link
                to="/alerts/settings"
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">التنبيهات</h1>
              <p className="text-gray-600">
                ابق على اطلاع بآخر التحديثات والعروض الجديدة
              </p>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-sm text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>تحديد الكل كمقروء</span>
              </button>
            )}
          </div>

          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">المجموع</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">{alerts.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 space-x-reverse">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm text-gray-600">غير مقروءة</span>
              </div>
              <p className="text-2xl font-bold text-red-600 mt-1">{unreadCount}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-gray-600">مميزة</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{starredCount}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 space-x-reverse">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">انخفاض أسعار</span>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-1">{priceDropCount}</p>
            </div>
          </div>

          {/* شريط البحث والفلاتر */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-4 space-x-reverse mb-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="البحث في التنبيهات..."
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>فلترة</span>
              </button>
            </div>

            {/* فلاتر سريعة */}
            {showFilters && (
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'الكل', count: alerts.length },
                  { key: 'unread', label: 'غير مقروءة', count: unreadCount },
                  { key: 'starred', label: 'مميزة', count: starredCount },
                  { key: 'price_drop', label: 'انخفاض أسعار', count: priceDropCount },
                  { key: 'new_listing', label: 'إعلانات جديدة', count: alerts.filter(a => a.type === 'new_listing').length },
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setFilterType(filter.key as any)}
                    className={`flex items-center space-x-2 space-x-reverse px-3 py-1 text-sm rounded-full transition-colors ${
                      filterType === filter.key
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className="bg-white px-1.5 py-0.5 rounded-full text-xs">
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* قائمة التنبيهات */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد تنبيهات</h3>
              <p className="text-gray-600">
                {searchQuery ? 'لم يتم العثور على تنبيهات تطابق البحث' : 'لا توجد تنبيهات جديدة'}
              </p>
            </div>
          ) : (
            filteredAlerts.map(alert => (
              <div
                key={alert.id}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md ${
                  !alert.isRead ? 'border-r-4 border-r-green-500 bg-green-50/30' : ''
                }`}
              >
                <div className="flex items-start space-x-4 space-x-reverse">
                  {/* أيقونة نوع التنبيه */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {getAlertIcon(alert.type)}
                    </div>
                  </div>

                  {/* محتوى التنبيه */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`text-lg font-medium ${
                          !alert.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {alert.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{alert.description}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-sm text-gray-500">{alert.timestamp}</span>
                        {!alert.isRead && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                    </div>

                    {/* تفاصيل الإعلان إذا كان متوفراً */}
                    {alert.listingId && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          {alert.listingImage && (
                            <img
                              src={alert.listingImage}
                              alt={alert.listingTitle}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {alert.listingTitle}
                            </h4>
                            {alert.location && (
                              <p className="text-sm text-gray-600 mt-1">{alert.location}</p>
                            )}
                            {alert.oldPrice && alert.newPrice && (
                              <div className="flex items-center space-x-2 space-x-reverse mt-2">
                                <span className="text-sm text-gray-500 line-through">
                                  {alert.oldPrice}
                                </span>
                                <span className="text-sm font-bold text-green-600">
                                  {alert.newPrice}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* أزرار الإجراءات */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        {alert.actionUrl && (
                          <Link
                            to={alert.actionUrl}
                            onClick={() => markAsRead(alert.id)}
                            className="text-sm text-green-600 hover:text-green-700 font-medium"
                          >
                            {alert.type === 'message' ? 'عرض الرسالة' : 
                             alert.type === 'system' ? 'عرض التفاصيل' : 'عرض الإعلان'}
                          </Link>
                        )}
                        {!alert.isRead && (
                          <button
                            onClick={() => markAsRead(alert.id)}
                            className="text-sm text-gray-600 hover:text-gray-700"
                          >
                            تحديد كمقروء
                          </button>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => toggleStar(alert.id)}
                          className={`p-1 rounded transition-colors ${
                            alert.isStarred
                              ? 'text-yellow-500 hover:text-yellow-600'
                              : 'text-gray-400 hover:text-yellow-500'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${alert.isStarred ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => archiveAlert(alert.id)}
                          className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteAlert(alert.id)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* دعوة لإنشاء تنبيهات جديدة */}
        {filteredAlerts.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 text-center">
            <Bell className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              أنشئ تنبيهات مخصصة
            </h3>
            <p className="text-gray-600 mb-4">
              احصل على إشعارات فورية عند نشر إعلانات تطابق اهتماماتك
            </p>
            <Link
              to="/alerts/create"
              className="inline-flex items-center space-x-2 space-x-reverse px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء تنبيه جديد</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;