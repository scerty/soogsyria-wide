// src/pages/MessagesPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Search,
  Filter,
  MoreVertical,
  Star,
  Archive,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  User,
  Phone,
  Mail,
  Send,
  Paperclip,
  Image as ImageIcon,
  ArrowRight,
  CheckCheck,
  Check,
} from 'lucide-react';

// أنواع البيانات الوهمية
interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isSentByMe: boolean;
}

interface Conversation {
  id: number;
  listingId: number;
  listingTitle: string;
  listingImage: string;
  listingPrice: string;
  interestedUserId: number;
  interestedUserName: string;
  interestedUserAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isStarred: boolean;
  isArchived: boolean;
  messages: Message[];
}

// بيانات وهمية للمحادثات
const mockConversations: Conversation[] = [
  {
    id: 1,
    listingId: 101,
    listingTitle: 'تويوتا كامري 2023 - حالة ممتازة',
    listingImage: 'https://picsum.photos/seed/car1/400/300',
    listingPrice: '85,000 ل.س',
    interestedUserId: 201,
    interestedUserName: 'أحمد محمد',
    interestedUserAvatar: 'https://picsum.photos/seed/user1/100/100',
    lastMessage: 'هل يمكنني معاينة السيارة غداً؟',
    lastMessageTime: '10:30 ص',
    unreadCount: 2,
    isStarred: true,
    isArchived: false,
    messages: [
      {
        id: 1,
        senderId: 201,
        senderName: 'أحمد محمد',
        content: 'السلام عليكم، أنا مهتم بهذه السيارة',
        timestamp: '09:15 ص',
        isRead: true,
        isSentByMe: false,
      },
      {
        id: 2,
        senderId: 1,
        senderName: 'أنت',
        content: 'وعليكم السلام، أهلاً وسهلاً. السيارة متوفرة للمعاينة',
        timestamp: '09:20 ص',
        isRead: true,
        isSentByMe: true,
      },
      {
        id: 3,
        senderId: 201,
        senderName: 'أحمد محمد',
        content: 'ممتاز، ما هو أفضل وقت للمعاينة؟',
        timestamp: '09:25 ص',
        isRead: true,
        isSentByMe: false,
      },
      {
        id: 4,
        senderId: 1,
        senderName: 'أنت',
        content: 'يمكنك المجيء أي وقت من 10 صباحاً إلى 6 مساءً',
        timestamp: '09:30 ص',
        isRead: true,
        isSentByMe: true,
      },
      {
        id: 5,
        senderId: 201,
        senderName: 'أحمد محمد',
        content: 'هل يمكنني معاينة السيارة غداً؟',
        timestamp: '10:30 ص',
        isRead: false,
        isSentByMe: false,
      },
    ],
  },
  {
    id: 2,
    listingId: 102,
    listingTitle: 'شقة 3 غرف في المزة - إطلالة رائعة',
    listingImage: 'https://picsum.photos/seed/apartment1/400/300',
    listingPrice: '45,000,000 ل.س',
    interestedUserId: 202,
    interestedUserName: 'فاطمة أحمد',
    interestedUserAvatar: 'https://picsum.photos/seed/user2/100/100',
    lastMessage: 'شكراً لك، سأتواصل معك قريباً',
    lastMessageTime: 'أمس',
    unreadCount: 0,
    isStarred: false,
    isArchived: false,
    messages: [
      {
        id: 6,
        senderId: 202,
        senderName: 'فاطمة أحمد',
        content: 'مرحباً، هل الشقة ما زالت متاحة؟',
        timestamp: 'أمس 2:15 م',
        isRead: true,
        isSentByMe: false,
      },
      {
        id: 7,
        senderId: 1,
        senderName: 'أنت',
        content: 'نعم، الشقة متاحة. هل تريدين تحديد موعد للمعاينة؟',
        timestamp: 'أمس 2:20 م',
        isRead: true,
        isSentByMe: true,
      },
      {
        id: 8,
        senderId: 202,
        senderName: 'فاطمة أحمد',
        content: 'شكراً لك، سأتواصل معك قريباً',
        timestamp: 'أمس 2:25 م',
        isRead: true,
        isSentByMe: false,
      },
    ],
  },
  {
    id: 3,
    listingId: 103,
    listingTitle: 'هيونداي إلنترا 2022 - فل أوبشن',
    listingImage: 'https://picsum.photos/seed/car2/400/300',
    listingPrice: '72,000 ل.س',
    interestedUserId: 203,
    interestedUserName: 'محمد علي',
    interestedUserAvatar: 'https://picsum.photos/seed/user3/100/100',
    lastMessage: 'هل السعر قابل للتفاوض؟',
    lastMessageTime: '2 أيام',
    unreadCount: 1,
    isStarred: false,
    isArchived: false,
    messages: [
      {
        id: 9,
        senderId: 203,
        senderName: 'محمد علي',
        content: 'السلام عليكم، مهتم بالسيارة',
        timestamp: 'منذ 2 أيام 11:00 ص',
        isRead: true,
        isSentByMe: false,
      },
      {
        id: 10,
        senderId: 203,
        senderName: 'محمد علي',
        content: 'هل السعر قابل للتفاوض؟',
        timestamp: 'منذ 2 أيام 11:05 ص',
        isRead: false,
        isSentByMe: false,
      },
    ],
  },
];

const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations[0]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'starred' | 'archived'>('all');

  // فلترة المحادثات
  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = 
      conv.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.interestedUserName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterType === 'all' ||
      (filterType === 'unread' && conv.unreadCount > 0) ||
      (filterType === 'starred' && conv.isStarred) ||
      (filterType === 'archived' && conv.isArchived);
    
    return matchesSearch && matchesFilter && !conv.isArchived;
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // هنا سيتم إرسال الرسالة للـ API
    console.log('إرسال رسالة:', newMessage);
    setNewMessage('');
  };

  const markAsRead = (conversationId: number) => {
    // هنا سيتم تحديث حالة القراءة في الـ API
    console.log('تحديد كمقروء:', conversationId);
  };

  const toggleStar = (conversationId: number) => {
    // هنا سيتم تحديث حالة النجمة في الـ API
    console.log('تبديل النجمة:', conversationId);
  };

  const archiveConversation = (conversationId: number) => {
    // هنا سيتم أرشفة المحادثة في الـ API
    console.log('أرشفة المحادثة:', conversationId);
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
                <MessageSquare className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">الرسائل</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-200px)] flex">
          {/* قائمة المحادثات */}
          <div className="w-1/3 border-l border-gray-200 flex flex-col">
            {/* رأس قائمة المحادثات */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">المحادثات</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              {/* شريط البحث */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="البحث في المحادثات..."
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* فلاتر سريعة */}
              {showFilters && (
                <div className="mt-3 flex space-x-2 space-x-reverse">
                  {[
                    { key: 'all', label: 'الكل' },
                    { key: 'unread', label: 'غير مقروءة' },
                    { key: 'starred', label: 'مميزة' },
                  ].map(filter => (
                    <button
                      key={filter.key}
                      onClick={() => setFilterType(filter.key as any)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        filterType === filter.key
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* قائمة المحادثات */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map(conversation => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3 space-x-reverse">
                    {/* صورة المستخدم */}
                    <div className="relative">
                      <img
                        src={conversation.interestedUserAvatar || `https://ui-avatars.com/api/?name=${conversation.interestedUserName}&background=10b981&color=fff`}
                        alt={conversation.interestedUserName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.unreadCount > 0 && (
                        <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* معلومات الإعلان */}
                      <div className="flex items-center space-x-2 space-x-reverse mb-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {conversation.interestedUserName}
                        </h3>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          {conversation.isStarred && (
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          )}
                          <span className="text-xs text-gray-500">
                            {conversation.lastMessageTime}
                          </span>
                        </div>
                      </div>

                      {/* عنوان الإعلان */}
                      <p className="text-xs text-green-600 mb-1 truncate">
                        {conversation.listingTitle}
                      </p>

                      {/* آخر رسالة */}
                      <p className={`text-sm truncate ${
                        conversation.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                      }`}>
                        {conversation.lastMessage}
                      </p>
                    </div>

                    {/* قائمة الإجراءات */}
                    <div className="relative">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredConversations.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>لا توجد محادثات</p>
                </div>
              )}
            </div>
          </div>

          {/* منطقة المحادثة */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col">
              {/* رأس المحادثة */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <img
                      src={selectedConversation.interestedUserAvatar || `https://ui-avatars.com/api/?name=${selectedConversation.interestedUserName}&background=10b981&color=fff`}
                      alt={selectedConversation.interestedUserName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedConversation.interestedUserName}
                      </h3>
                      <Link
                        to={`/listings/${selectedConversation.listingId}`}
                        className="text-sm text-green-600 hover:underline"
                      >
                        {selectedConversation.listingTitle}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => toggleStar(selectedConversation.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        selectedConversation.isStarred
                          ? 'text-yellow-500 bg-yellow-50'
                          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                      }`}
                    >
                      <Star className={`w-5 h-5 ${selectedConversation.isStarred ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => archiveConversation(selectedConversation.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Archive className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* معلومات الإعلان */}
                <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <img
                      src={selectedConversation.listingImage}
                      alt={selectedConversation.listingTitle}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {selectedConversation.listingTitle}
                      </h4>
                      <p className="text-lg font-bold text-green-600 mt-1">
                        {selectedConversation.listingPrice}
                      </p>
                    </div>
                    <Link
                      to={`/listings/${selectedConversation.listingId}`}
                      className="text-sm text-green-600 hover:underline"
                    >
                      عرض الإعلان
                    </Link>
                  </div>
                </div>
              </div>

              {/* الرسائل */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSentByMe ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isSentByMe
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-between mt-1 text-xs ${
                        message.isSentByMe ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        <span>{message.timestamp}</span>
                        {message.isSentByMe && (
                          <div className="flex items-center space-x-1">
                            {message.isRead ? (
                              <CheckCheck className="w-3 h-3" />
                            ) : (
                              <Check className="w-3 h-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* مربع إرسال الرسالة */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-end space-x-2 space-x-reverse">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      rows={1}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">اختر محادثة لبدء المراسلة</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;