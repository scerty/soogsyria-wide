// src/config/realEstateFilters.ts

import { FilterOption } from '../types/listing';

export interface FilterConfig {
  title: string;
  key: string;
  type: 'checkbox' | 'range' | 'buttonGroup' | 'select';
  options?: FilterOption[];
  visibleWhen?: (filters: any, activeTab?: string, activeSubCategory?: string) => boolean;
  placeholder?: {
    from?: string;
    to?: string;
  };
  multiSelect?: boolean;
}

// المحافظات السورية (تتطابق مع governorate__slug_en)
const GOVERNORATES: FilterOption[] = [
  { label: 'دمشق', value: 'damascus', count: 2200 },
  { label: 'ريف دمشق', value: 'rural-damascus', count: 1656 },
  { label: 'حلب', value: 'aleppo', count: 1405 },
  { label: 'اللاذقية', value: 'lattakia', count: 2686 },
  { label: 'طرطوس', value: 'tartous', count: 5603 },
  { label: 'حمص', value: 'homs', count: 1860 },
  { label: 'حماة', value: 'hama', count: 299 },
  { label: 'إدلب', value: 'idleb', count: 109 },
  { label: 'دير الزور', value: 'deir-ez-zor', count: 219 },
  { label: 'الرقة', value: 'ar-raqqa', count: 84 },
  { label: 'الحسكة', value: 'al-hasakeh', count: 48 },
  { label: 'درعا', value: 'dara', count: 189 },
  { label: 'السويداء', value: 'as-sweida', count: 28 },
  { label: 'القنيطرة', value: 'quneitra', count: 34 },
];

// المناطق حسب المحافظة (تتطابق مع area__slug_en)
const AREAS_BY_GOVERNORATE: Record<string, FilterOption[]> = {
  'idleb': [
    { label: 'مركز أريحا', value: 'ariha', count: 0 },
    { label: 'احسم', value: 'ehsem', count: 0 },
    { label: 'محمبل', value: 'mhambal', count: 0 },
    { label: 'مركز جسر الشغور', value: 'jisr-ash-shugur', count: 0 },
    { label: 'بداما', value: 'badama', count: 0 },
    { label: 'دركوش', value: 'darkosh', count: 0 },
    { label: 'الجانودية', value: 'janudiyeh', count: 0 },
    { label: 'مركز حارم', value: 'harim', count: 0 },
    { label: 'دانا', value: 'dana', count: 0 },
    { label: 'سلقين', value: 'salqin', count: 0 },
    { label: 'كفر تخاريم', value: 'kafr-takharim', count: 0 },
    { label: 'قورقينا', value: 'qourqeena', count: 0 },
    { label: 'أرمناز', value: 'armanaz', count: 0 },
    { label: 'أبو الظهور', value: 'abul-thohur', count: 0 },
    { label: 'بنش', value: 'bennsh', count: 0 },
    { label: 'سراقب', value: 'saraqab', count: 0 },
    { label: 'تفتناز', value: 'teftnaz', count: 0 },
    { label: 'معرة تمصرين', value: 'maaret-tamsrin', count: 0 },
    { label: 'سرمين', value: 'sarmin', count: 0 },
    { label: 'مركز إدلب', value: 'idleb', count: 0 },
    { label: 'مركز معرة النعمان', value: 'maarrat-an-numan', count: 0 },
    { label: 'خان شيخون', value: 'khan-shaykun', count: 0 },
    { label: 'سنجار', value: 'sanjar', count: 0 },
    { label: 'كفر نبل', value: 'kafr-nobol', count: 0 },
    { label: 'التمانعة', value: 'tamanaah', count: 0 },
    { label: 'حيش', value: 'heish', count: 0 },
  ],
  'al-hasakeh': [
    { label: 'مركز القامشلي', value: 'quamishli', count: 0 },
    { label: 'تل حميس', value: 'tal-hmis', count: 0 },
    { label: 'عامودا', value: 'amuda', count: 0 },
    { label: 'قحطانية', value: 'qahtaniyyeh', count: 0 },
    { label: 'مركز المالكية', value: 'al-malikeyyeh', count: 0 },
    { label: 'جوادية', value: 'jawadiyah', count: 0 },
    { label: 'يعربية', value: 'yarobiyah', count: 0 },
    { label: 'مركز رأس العين', value: 'ras-al-ain', count: 0 },
    { label: 'درباسية', value: 'darbasiyah', count: 0 },
    { label: 'مركز الحسكة', value: 'al-hasakeh', count: 0 },
    { label: 'تل تمر', value: 'tal-tamer', count: 0 },
    { label: 'شدادة', value: 'shadadah', count: 0 },
    { label: 'مركدة', value: 'markada', count: 0 },
    { label: 'بئر الحلو الوردية', value: 'ber-al-hulo-al-wardeyyeh', count: 0 },
    { label: 'العريشة', value: 'areesheh', count: 0 },
    { label: 'الهول', value: 'hole', count: 0 },
  ],
  'ar-raqqa': [
    { label: 'مركز الثورة', value: 'al-thawrah', count: 0 },
    { label: 'المنصورة', value: 'mansura', count: 0 },
    { label: 'الجرنية', value: 'jurneyyeh', count: 0 },
    { label: 'مركز تل أبيض', value: 'tell-abiad', count: 0 },
    { label: 'سلوك', value: 'suluk', count: 0 },
    { label: 'عين عيسى', value: 'ein-issa', count: 0 },
    { label: 'مركز الرقة', value: 'ar-raqqa', count: 0 },
    { label: 'السبخة', value: 'sabka', count: 0 },
    { label: 'الكرامة', value: 'karama', count: 0 },
    { label: 'معدان', value: 'maadan', count: 0 },
  ],
  'as-sweida': [
    { label: 'شقا', value: 'shaqa', count: 0 },
    { label: 'العريقة', value: 'ariqa', count: 0 },
    { label: 'الصورة الصغيرة', value: 'little-sura', count: 0 },
    { label: 'مركز شهبا', value: 'shahba', count: 0 },
    { label: 'مركز صلخد', value: 'salkhad', count: 0 },
    { label: 'القريا', value: 'qarayya', count: 0 },
    { label: 'الغارية', value: 'gharyeh', count: 0 },
    { label: 'ذيبين', value: 'thibeen', count: 0 },
    { label: 'ملح', value: 'milh', count: 0 },
    { label: 'مركز السويداء', value: 'as-sweida', count: 0 },
    { label: 'المزرعة', value: 'mazraa', count: 0 },
    { label: 'المشنف', value: 'mashnaf', count: 0 },
  ],
  'quneitra': [
    { label: 'مركز فيق', value: 'fiq', count: 0 },
    { label: 'البطيحة', value: 'al-butayhah', count: 0 },
    { label: 'مركز القنيطرة', value: 'quneitra', count: 0 },
    { label: 'خان أرنبة', value: 'khan-arnaba', count: 0 },
    { label: 'الخشنية', value: 'al-khashniyyeh', count: 0 },
    { label: 'مسعدة', value: 'masaada', count: 0 },
  ],
  'lattakia': [
    { label: 'كنسبا', value: 'kansaba', count: 0 },
    { label: 'صلنفة', value: 'salanfa', count: 0 },
    { label: 'مزيرعة', value: 'mzaira', count: 0 },
    { label: 'عين التينة', value: 'ein-et-teeneh', count: 0 },
    { label: 'مركزالحفة', value: 'al-haffa', count: 0 },
    { label: 'الفاخورة', value: 'fakhura', count: 0 },
    { label: 'جوبة برغال', value: 'jobet-berghal', count: 0 },
    { label: 'مركز القرداحة', value: 'al-qardaha', count: 0 },
    { label: 'حرف المسيترة', value: 'harf-elmseitra', count: 0 },
    { label: 'مركز جبلة', value: 'jablah', count: 0 },
    { label: 'القطيلبية', value: 'qteilbiyyeh', count: 0 },
    { label: 'عين شقاق', value: 'ein-shaqaq', count: 0 },
    { label: 'دالية', value: 'dalyeh', count: 0 },
    { label: 'عين الشرقية', value: 'ein-elsharqiyeh', count: 0 },
    { label: 'بيت ياشوط', value: 'beit-yashout', count: 0 },
    { label: 'ربيعة', value: 'rabeea', count: 0 },
    { label: 'البهلولية', value: 'bahlolieh', count: 0 },
    { label: 'عين البيضا', value: 'ein-el-bayda', count: 0 },
    { label: 'كسب', value: 'kasab', count: 0 },
    { label: 'هنادي', value: 'hanadi', count: 0 },
    { label: 'قسطل معاف', value: 'qastal-maaf', count: 0 },
    { label: 'مركز اللاذقية', value: 'lattakia', count: 0 },
  ],
  'aleppo': [
    { label: 'اخترين', value: 'aghtrin', count: 0 },
    { label: 'صوران', value: 'suran', count: 0 },
    { label: 'مركز اعزاز', value: 'azaz', count: 0 },
    { label: 'مارع', value: 'mare', count: 0 },
    { label: 'تل رفعت', value: 'tall-refaat', count: 0 },
    { label: 'نبل', value: 'nabul', count: 0 },
    { label: 'الراعي', value: 'ar-raee', count: 0 },
    { label: 'عريمة', value: 'arima', count: 0 },
    { label: 'مركز الباب', value: 'al-bab', count: 0 },
    { label: 'تادف', value: 'tadaf', count: 0 },
    { label: 'رسم حرمل الامام', value: 'rasm-haram-el-imam', count: 0 },
    { label: 'دير حافر', value: 'dayr-hafir', count: 0 },
    { label: 'كويرس شرقي', value: 'eastern-kwaires', count: 0 },
    { label: 'مركز السفيرة', value: 'as-safira', count: 0 },
    { label: 'بنان', value: 'banan', count: 0 },
    { label: 'الحاجب', value: 'hajeb', count: 0 },
    { label: 'خناصر', value: 'khanaser', count: 0 },
    { label: 'تل الضمان', value: 'tall-ed-daman', count: 0 },
    { label: 'الحاضر', value: 'hadher', count: 0 },
    { label: 'الزربة', value: 'zarbah', count: 0 },
    { label: 'دارة عزة', value: 'daret-azza', count: 0 },
    { label: 'أتارب', value: 'atareb', count: 0 },
    { label: 'حريتان', value: 'haritan', count: 0 },
    { label: 'مركز جبل سمعان', value: 'jebel-saman', count: 0 },
    { label: 'مركز جرابلس', value: 'jarablus', count: 0 },
    { label: 'غندورة', value: 'ghandorah', count: 0 },
    { label: 'بلبل', value: 'bulbul', count: 0 },
    { label: 'راجو', value: 'raju', count: 0 },
    { label: 'معبطلي', value: 'mabtali', count: 0 },
    { label: 'شيخ الحديد', value: 'sheikh-el-hadid', count: 0 },
    { label: 'جنديرس', value: 'jandairis', count: 0 },
    { label: 'شران', value: 'sharan', count: 0 },
    { label: 'مركز عفرين', value: 'afrin', count: 0 },
    { label: 'شيوخ تحتاني', value: 'lower-shyookh', count: 0 },
    { label: 'مركز عين العرب', value: 'ain-al-arab', count: 0 },
    { label: 'صرين', value: 'sarin', count: 0 },
    { label: 'مركز منبج', value: 'menbij', count: 0 },
    { label: 'أبو قلقل', value: 'abu-qalqal', count: 0 },
    { label: 'الخفسة', value: 'al-khafsa', count: 0 },
    { label: 'مسكنة', value: 'maskana', count: 0 },
  ],
  'hama': [
    { label: 'مركز السقيلبية', value: 'as-suqaylabiyah', count: 0 },
    { label: 'تلسلحب', value: 'tell-salhib', count: 0 },
    { label: 'الزيارة', value: 'ziyara', count: 0 },
    { label: 'شطحة', value: 'shat-ha', count: 0 },
    { label: 'قلعة المضيق', value: 'madiq-castle', count: 0 },
    { label: 'مركز السلمية', value: 'as-salamiyeh', count: 0 },
    { label: 'بري شرقي', value: 'eastern-bari', count: 0 },
    { label: 'السعن', value: 'as-saan', count: 0 },
    { label: 'عقيربات', value: 'oqeirbat', count: 0 },
    { label: 'مركز محردة', value: 'muhradah', count: 0 },
    { label: 'كفرزيتا', value: 'kafr-zeita', count: 0 },
    { label: 'كرناز', value: 'karnaz', count: 0 },
    { label: 'مركز حماة', value: 'hama', count: 0 },
    { label: 'صوران', value: 'suran', count: 0 },
    { label: 'حربنفسه', value: 'harbanifse', count: 0 },
    { label: 'الحمراء', value: 'hamra', count: 0 },
    { label: 'مركز مصياف', value: 'masyaf', count: 0 },
    { label: 'جب رملة', value: 'jeb-ramleh', count: 0 },
    { label: 'عوج', value: 'oj', count: 0 },
    { label: 'وادي العيون', value: 'wadi-el-oyoun', count: 0 },
    { label: 'عين حلاقيم', value: 'ein-halaqim', count: 0 },
    { label: 'صبورة', value: 'saboura', count: 0 },
  ],
  'homs': [
    { label: 'مركز الرستن', value: 'ar-rastan', count: 0 },
    { label: 'تلبيسة', value: 'talbiseh', count: 0 },
    { label: 'مركز القصير', value: 'al-qusayr', count: 0 },
    { label: 'المخرم', value: 'al-makhrim', count: 0 },
    { label: 'جب الجراح', value: 'jeb-ej-jarrah', count: 0 },
    { label: 'مركز تدمر', value: 'tadmor', count: 0 },
    { label: 'السخنة', value: 'sokhneh', count: 0 },
    { label: 'مركز تلكلخ', value: 'tall-kalakh', count: 0 },
    { label: 'حديدة', value: 'hadideh', count: 0 },
    { label: 'الحواش', value: 'hawash', count: 0 },
    { label: 'الناصرة', value: 'nasra', count: 0 },
    { label: 'مركز حمص', value: 'homs', count: 0 },
    { label: 'تلدو', value: 'taldu', count: 0 },
    { label: 'خربة تين نور', value: 'kherbet-tin-noor', count: 0 },
    { label: 'عين النسر', value: 'ein-elniser', count: 0 },
    { label: 'الفرقلس', value: 'farqalas', count: 0 },
    { label: 'الرقاما', value: 'raqama', count: 0 },
    { label: 'مهين', value: 'mahin', count: 0 },
    { label: 'صدد', value: 'sadad', count: 0 },
    { label: 'القريتين', value: 'qaryatein', count: 0 },
    { label: 'القبو', value: 'qabu', count: 0 },
    { label: 'شين', value: 'shin', count: 0 },
    { label: 'حسياء', value: 'hasyaa', count: 0 },
  ],
  'dara': [
    { label: 'مركز ازرع', value: 'izra', count: 0 },
    { label: 'جاسم', value: 'jasim', count: 0 },
    { label: 'الحراك', value: 'hrak', count: 0 },
    { label: 'نوى', value: 'nawa', count: 0 },
    { label: 'الشيخ مسكين', value: 'sheikh-miskine', count: 0 },
    { label: 'تسيل', value: 'tassil', count: 0 },
    { label: 'مركز الصنمين', value: 'as-sanamayn', count: 0 },
    { label: 'المسمية', value: 'masmiyyeh', count: 0 },
    { label: 'غباغب', value: 'ghabagheb', count: 0 },
    { label: 'مركز درعا', value: 'dara', count: 0 },
    { label: 'بصرى الشام', value: 'busra-esh-sham', count: 0 },
    { label: 'خربة غزالة', value: 'kherbet-ghazala', count: 0 },
    { label: 'الشجرة', value: 'ash-shajara', count: 0 },
    { label: 'داعل', value: 'dael', count: 0 },
    { label: 'مزيريب', value: 'mzeireb', count: 0 },
    { label: 'الجيزة', value: 'jizeh', count: 0 },
    { label: 'المسيفرة', value: 'mseifra', count: 0 },
  ],
  'deir-ez-zor': [
    { label: 'مركز البوكمال', value: 'abu-kamal', count: 0 },
    { label: 'هجين', value: 'hajin', count: 0 },
    { label: 'الجلاء', value: 'jalaa', count: 0 },
    { label: 'سوسة', value: 'susat', count: 0 },
    { label: 'مركز الميادين', value: 'al-mayadin', count: 0 },
    { label: 'ذيبان', value: 'thiban', count: 0 },
    { label: 'عشارة', value: 'ashara', count: 0 },
    { label: 'مركز دير الزور', value: 'deir-ez-zor', count: 0 },
    { label: 'كسرة', value: 'kisreh', count: 0 },
    { label: 'بصيرة', value: 'basira', count: 0 },
    { label: 'موحسن', value: 'muhasan', count: 0 },
    { label: 'التبني', value: 'tabni', count: 0 },
    { label: 'خشام', value: 'khasham', count: 0 },
    { label: 'صور', value: 'sur', count: 0 },
  ],
  'rural-damascus': [
    { label: 'صيدنايا', value: 'sidnaya', count: 0 },
    { label: 'رنكوس', value: 'rankus', count: 0 },
    { label: 'مركز الزبداني', value: 'az-zabdani', count: 0 },
    { label: 'الديماس', value: 'dimas', count: 0 },
    { label: 'عين الفيجة', value: 'ein-elfijeh', count: 0 },
    { label: 'مضايا', value: 'madaya', count: 0 },
    { label: 'سرغايا', value: 'sarghaya', count: 0 },
    { label: 'مركز القطيفة', value: 'al-qutayfah', count: 0 },
    { label: 'جيرود', value: 'jirud', count: 0 },
    { label: 'معلولا', value: 'maloula', count: 0 },
    { label: 'الرحيبة', value: 'raheiba', count: 0 },
    { label: 'مركز النبك', value: 'an-nabk', count: 0 },
    { label: 'دير عطية', value: 'deir-attiyeh', count: 0 },
    { label: 'صحنايا', value: 'sahnaya', count: 0 },
    { label: 'مركز دوما', value: 'duma', count: 0 },
    { label: 'السبع بيار', value: 'sabe-byar', count: 0 },
    { label: 'الضمير', value: 'dhameer', count: 0 },
    { label: 'النشابية', value: 'nashabiyeh', count: 0 },
    { label: 'الغزلانية', value: 'ghizlaniyyeh', count: 0 },
    { label: 'حران العواميد', value: 'haran-alawameed', count: 0 },
    { label: 'مركز قطنا', value: 'qatana', count: 0 },
    { label: 'سعسع', value: 'sasa', count: 0 },
    { label: 'بيت جن', value: 'bait-jan', count: 0 },
    { label: 'الكسوة', value: 'kisweh', count: 0 },
    { label: 'المليحة', value: 'maliha', count: 0 },
    { label: 'مركز يبرود', value: 'yabroud', count: 0 },
    { label: 'عسال الورد', value: 'esal-el-ward', count: 0 },
    { label: 'جرمانا', value: 'jaramana', count: 0 },
    { label: 'كفر بطنا', value: 'kafr-batna', count: 0 },
    { label: 'عربين', value: 'arbin', count: 0 },
    { label: 'حرستا', value: 'harasta', count: 0 },
    { label: 'مركز التل', value: 'at-tall', count: 0 },
    { label: 'مركز داريا', value: 'markaz-darayya', count: 0 },
    { label: 'الحجر الأسود', value: 'hajar-aswad', count: 0 },
    { label: 'ببيلا', value: 'babella', count: 0 },
    { label: 'قدسيا', value: 'qudsiya', count: 0 },
  ],
  'tartous': [
    { label: 'مركز الشيخ بدر', value: 'sheikh-badr', count: 0 },
    { label: 'قمصية', value: 'qumseyyeh', count: 0 },
    { label: 'برمانة المشايخ', value: 'baramanet-elmashayekh', count: 0 },
    { label: 'مركز بانياس', value: 'banyas', count: 0 },
    { label: 'الروضة', value: 'rawda', count: 0 },
    { label: 'العنازة', value: 'anaza', count: 0 },
    { label: 'حمام واصل', value: 'hamam-wasil', count: 0 },
    { label: 'الطواحين', value: 'tawahin', count: 0 },
    { label: 'تالين', value: 'taleen', count: 0 },
    { label: 'القدموس', value: 'qadmous', count: 0 },
    { label: 'مركز دريكيش', value: 'dreikish', count: 0 },
    { label: 'جنينة رسلان', value: 'jneinet-raslan', count: 0 },
    { label: 'حمين', value: 'hamin', count: 0 },
    { label: 'دوير رسلان', value: 'dweir-raslan', count: 0 },
    { label: 'مركز صافيتا', value: 'safita', count: 0 },
    { label: 'مشتى الحلو', value: 'mashta-elhiu', count: 0 },
    { label: 'البارقية', value: 'bariqiyeh', count: 0 },
    { label: 'سبة', value: 'sibbeh', count: 0 },
    { label: 'السيسنية', value: 'sisniyyeh', count: 0 },
    { label: 'رأس الخشوفة', value: 'ras-el-khashufeh', count: 0 },
    { label: 'أرواد', value: 'arwad', count: 0 },
    { label: 'مركز طرطوس', value: 'tartous', count: 0 },
    { label: 'الحميدية', value: 'hameidiyyeh', count: 0 },
    { label: 'خربة المعزة', value: 'kherbet-elmaaza', count: 0 },
    { label: 'سودا خوابي', value: 'soda-khawabi', count: 0 },
    { label: 'كريمة', value: 'kareemeh', count: 0 },
    { label: 'صفصافة', value: 'safsafa', count: 0 },
  ],
  'damascus': [
    { label: 'دمشق', value: 'damascus', count: 0 },
  ],
};

// دالة للحصول على قائمة المواقع الهرمية
export const getHierarchicalLocations = (selectedGovernorates: string[]): FilterOption[] => {
  const locations: FilterOption[] = [];
  
  // إضافة جميع المحافظات
  GOVERNORATES.forEach(gov => {
    locations.push({ ...gov, isGovernorate: true });
    
    // إذا كانت المحافظة محددة، أضف مناطقها
    if (selectedGovernorates.includes(gov.value)) {
      const areas = AREAS_BY_GOVERNORATE[gov.value] || [];
      areas.forEach(area => {
        locations.push({ ...area, parentGovernorate: gov.value });
      });
    }
  });
  
  return locations;
};

// أنواع العمليات العقارية (تتطابق مع operation_type)
const OPERATION_TYPES: FilterOption[] = [
  { label: 'للبيع', value: 'sale', count: 1456 },
  { label: 'للإيجار', value: 'rent', count: 987 },
  { label: 'للشراء', value: 'buy', count: 654 },
  { label: 'تجاري', value: 'commercial', count: 345 },
];

// أنواع العقارات (تتطابق مع property_type)
const PROPERTY_TYPES: FilterOption[] = [
  { label: 'شقة', value: 'apartment', count: 1456 },
  { label: 'منزل مستقل', value: 'villa', count: 987 },
  { label: 'تاون هاوس', value: 'townhouse', count: 654 },
  { label: 'دوبلكس', value: 'duplex', count: 345 },
  { label: 'استوديو', value: 'studio', count: 234 },
  { label: 'بنتهاوس', value: 'penthouse', count: 123 },
  { label: 'مكتب', value: 'office', count: 456 },
  { label: 'محل تجاري', value: 'shop', count: 389 },
  { label: 'مستودع', value: 'warehouse', count: 234 },
  { label: 'أرض سكنية', value: 'residential_land', count: 567 },
  { label: 'أرض تجارية', value: 'commercial_land', count: 345 },
  { label: 'أرض زراعية', value: 'agricultural_land', count: 234 },
];

// حالة العقار (تتطابق مع condition)
const CONDITIONS: FilterOption[] = [
  { label: 'جديد', value: 'new', count: 456 },
  { label: 'ممتاز', value: 'excellent', count: 1234 },
  { label: 'جيد جداً', value: 'very_good', count: 987 },
  { label: 'جيد', value: 'good', count: 654 },
  { label: 'يحتاج ترميم', value: 'needs_renovation', count: 234 },
];

// نوع الملكية (تتطابق مع ownership_type)
const OWNERSHIP_TYPES: FilterOption[] = [
  { label: 'ملكية تامة', value: 'full_ownership', count: 1456 },
  { label: 'حق انتفاع', value: 'usufruct', count: 567 },
  { label: 'إيجار طويل الأمد', value: 'long_term_lease', count: 234 },
  { label: 'شراكة', value: 'partnership', count: 123 },
];

// نوع الاستثمار (تتطابق مع investment_type)
const INVESTMENT_TYPES: FilterOption[] = [
  { label: 'استثمار سكني', value: 'residential_investment', count: 567 },
  { label: 'استثمار تجاري', value: 'commercial_investment', count: 456 },
  { label: 'استثمار سياحي', value: 'tourism_investment', count: 234 },
  { label: 'استثمار زراعي', value: 'agricultural_investment', count: 123 },
];

// خيارات غرف النوم (تتطابق مع bedrooms)
const BEDROOM_OPTS: FilterOption[] = [
  { label: 'الكل', value: 'all' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' },
];

// خيارات الحمامات (تتطابق مع bathrooms)
const BATHROOM_OPTS: FilterOption[] = [
  { label: 'الكل', value: 'all' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
];

// خيارات الطابق (تتطابق مع floor)
const FLOOR_OPTS: FilterOption[] = [
  { label: 'الأرضي', value: '0' },
  { label: 'الأول', value: '1' },
  { label: 'الثاني', value: '2' },
  { label: 'الثالث', value: '3' },
  { label: 'الرابع', value: '4' },
  { label: 'الخامس فما فوق', value: '5+' },
];

// المرافق (خيارات boolean)
const AMENITIES: FilterOption[] = [
  { label: 'حديقة', value: 'has_garden' },
  { label: 'موقف سيارة', value: 'has_parking' },
  { label: 'بلكونة', value: 'has_balcony' },
  { label: 'مصعد', value: 'has_elevator' },
];

// دالة للحصول على نوع العقار حسب التصنيف والتصنيف الفرعي
const getPropertyTypesByCategory = (activeTab: string, subCategory?: string): FilterOption[] => {
  // للتصنيف التجاري
  if (activeTab === 'تجاري' || activeTab === 'commercial') {
    return PROPERTY_TYPES.filter(type => 
      ['office', 'shop', 'warehouse', 'commercial_land'].includes(type.value)
    );
  }
  
  // للتصنيفات الفرعية المحددة
  if (subCategory) {
    if (subCategory.includes('قطع أراضي') || subCategory.includes('أرض')) {
      return PROPERTY_TYPES.filter(type => type.value.includes('_land'));
    }
    if (subCategory.includes('تجاري') || subCategory.includes('مكاتب')) {
      return PROPERTY_TYPES.filter(type => 
        ['office', 'shop', 'warehouse'].includes(type.value)
      );
    }
  }
  
  // افتراضي للعقارات السكنية
  return PROPERTY_TYPES.filter(type => 
    ['apartment', 'villa', 'townhouse', 'duplex', 'studio', 'penthouse'].includes(type.value)
  );
};

// تكوين الفلاتر الأساسية
export const FILTER_REGISTRY: FilterConfig[] = [
  {
    title: 'المنطقة',
    key: 'locations',
    type: 'checkbox',
    options: [], // سيتم ملؤها ديناميكياً
  },
  {
    title: 'نوع العملية',
    key: 'operationType',
    type: 'buttonGroup',
    options: OPERATION_TYPES,
  },
  {
    title: 'نوع العقار',
    key: 'propertyType',
    type: 'checkbox',
    options: [], // سيتم ملؤها ديناميكياً
  },
  {
    title: 'حالة العقار',
    key: 'condition',
    type: 'checkbox',
    options: CONDITIONS,
    visibleWhen: (filters, activeTab, subCategory) => {
      // إخفاء للأراضي الفارغة
      return !subCategory?.includes('قطع أراضي') || 
             !filters.propertyType?.includes('residential_land') ||
             !filters.propertyType?.includes('commercial_land');
    },
  },
  {
    title: 'نوع الملكية',
    key: 'ownershipType',
    type: 'checkbox',
    options: OWNERSHIP_TYPES,
    visibleWhen: (filters, activeTab) => {
      // إظهار للبيع والشراء فقط
      return activeTab === 'بيع' || activeTab === 'شراء';
    },
  },
  {
    title: 'نوع الاستثمار',
    key: 'investmentType',
    type: 'checkbox',
    options: INVESTMENT_TYPES,
    visibleWhen: (filters, activeTab) => {
      // إظهار للاستثمار التجاري
      return activeTab === 'تجاري';
    },
  },
  {
    title: 'السعر',
    key: 'price',
    type: 'range',
    placeholder: {
      from: 'من (ل.س)',
      to: 'إلى (ل.س)',
    },
  },
  {
    title: 'المساحة (م²)',
    key: 'size',
    type: 'range',
    placeholder: {
      from: 'من',
      to: 'إلى',
    },
  },
  {
    title: 'عدد غرف النوم',
    key: 'bedrooms',
    type: 'buttonGroup',
    options: BEDROOM_OPTS,
    visibleWhen: (filters, activeTab, subCategory) => {
      // إظهار فقط للعقارات السكنية
      if (activeTab === 'تجاري') return false;
      if (subCategory?.includes('قطع أراضي')) return false;
      if (filters.propertyType?.some((type: string) => 
        type.includes('_land') || ['office', 'shop', 'warehouse'].includes(type)
      )) return false;
      return true;
    },
  },
  {
    title: 'عدد الحمامات',
    key: 'bathrooms',
    type: 'buttonGroup',
    options: BATHROOM_OPTS,
    visibleWhen: (filters, activeTab, subCategory) => {
      // نفس شروط غرف النوم
      if (activeTab === 'تجاري') return false;
      if (subCategory?.includes('قطع أراضي')) return false;
      if (filters.propertyType?.some((type: string) => 
        type.includes('_land') || ['office', 'shop', 'warehouse'].includes(type)
      )) return false;
      return true;
    },
  },
  {
    title: 'الطابق',
    key: 'floor',
    type: 'checkbox',
    options: FLOOR_OPTS,
    visibleWhen: (filters) => {
      // إظهار فقط للشقق والمكاتب
      return filters.propertyType?.some((type: string) => 
        ['apartment', 'office'].includes(type)
      ) || false;
    },
  },
  {
    title: 'سنة البناء',
    key: 'builtYear',
    type: 'range',
    placeholder: {
      from: 'من',
      to: 'إلى',
    },
    visibleWhen: (filters, activeTab, subCategory) => {
      // إخفاء للأراضي الفارغة
      if (subCategory?.includes('قطع أراضي')) return false;
      return !filters.propertyType?.some((type: string) => 
        type.includes('_land')
      );
    },
  },
  {
    title: 'المرافق والخدمات',
    key: 'amenities',
    type: 'checkbox',
    options: AMENITIES,
  },
];

// Helper function to get dynamic filter options
export const getDynamicFilterOptions = (
  filterKey: string, 
  activeTab: string, 
  subCategory?: string,
  filters?: any
): FilterOption[] => {
  switch (filterKey) {
    case 'propertyType':
      return getPropertyTypesByCategory(activeTab, subCategory);
    default:
      return [];
  }
};

// Helper function to build API query params from filters
export const buildQueryParams = (
  filters: any, 
  activeTab: string, 
  subCategory?: string
): Record<string, any> => {
  console.log('🏗️ Building query params from filters:', filters);
  
  const params: Record<string, any> = {
    type: 'real_estate',
  };

  console.log('📝 Base params:', params);

  // تطبيق الفلاتر
  Object.entries(filters).forEach(([key, value]) => {
    console.log(`🔧 Processing filter: ${key} =`, value);
    if (!value) return;
    
    switch (key) {
      case 'locations':
        if (Array.isArray(value) && value.length > 0) {
          // فصل المحافظات عن المناطق والمناطق الفرعية
          const governorates = value.filter(loc => 
            GOVERNORATES.some(gov => gov.value === loc)
          );
          const areas = value.filter(loc => 
            !GOVERNORATES.some(gov => gov.value === loc)
          );
          
          if (governorates.length > 0) {
            params['location__governorate__slug_en__in'] = governorates.join(',');
          }
          if (areas.length > 0) {
            // يمكن أن تكون المناطق في area أو sub_area
            params['location__area__slug_en__in'] = areas.join(',');
            // إضافة فلترة للمناطق الفرعية أيضاً
            params['location__sub_area__slug_en__in'] = areas.join(',');
          }
        }
        break;
      case 'operationType':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__operation_type__in'] = value.join(',');
        }
        break;
      case 'propertyType':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__property_type__in'] = value.join(',');
        }
        break;
      case 'condition':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__condition__in'] = value.join(',');
        }
        break;
      case 'ownershipType':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__ownership_type__in'] = value.join(',');
        }
        break;
      case 'investmentType':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__investment_type__in'] = value.join(',');
        }
        break;
      case 'price':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['price__gte'] = value.from;
          if (value.to !== undefined) params['price__lte'] = value.to;
        }
        break;
      case 'size':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['estate_detail__area_sqm__gte'] = value.from;
          if (value.to !== undefined) params['estate_detail__area_sqm__lte'] = value.to;
        }
        break;
      case 'bedrooms':
        if (Array.isArray(value) && value.length > 0 && !value.includes('all')) {
          const minBedrooms = Math.min(...value.map(Number).filter(n => !isNaN(n)));
          if (!isNaN(minBedrooms)) {
            params['estate_detail__bedrooms__gte'] = minBedrooms;
          }
        }
        break;
      case 'bathrooms':
        if (Array.isArray(value) && value.length > 0 && !value.includes('all')) {
          const minBathrooms = Math.min(...value.map(Number).filter(n => !isNaN(n)));
          if (!isNaN(minBathrooms)) {
            params['estate_detail__bathrooms__gte'] = minBathrooms;
          }
        }
        break;
      case 'floor':
        if (Array.isArray(value) && value.length > 0) {
          params['estate_detail__floor__in'] = value.join(',');
        }
        break;
      case 'builtYear':
        if (typeof value === 'object') {
          if (value.from !== undefined) params['estate_detail__built_year__gte'] = value.from;
          if (value.to !== undefined) params['estate_detail__built_year__lte'] = value.to;
        }
        break;
      case 'amenities':
        if (Array.isArray(value) && value.length > 0) {
          // تطبيق فلاتر boolean للمرافق
          value.forEach(amenity => {
            if (['has_garden', 'has_parking', 'has_balcony', 'has_elevator'].includes(amenity)) {
              params[`estate_detail__${amenity}`] = true;
            }
          });
        }
        break;
    }
  });

  console.log('✅ Final query params:', params);
  return params;
};

// Helper functions for URL parameters
export const filtersToUrlParams = (filters: any): URLSearchParams => {
  const params = new URLSearchParams();
  
  console.log('📤 Converting filters to URL params:', filters);
  
  Object.entries(filters).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      console.log(`⏭️ Skipping empty filter: ${key}`);
      return;
    }
    
    if (Array.isArray(value) && value.length > 0) {
      console.log(`📋 Array filter: ${key} = [${value.join(', ')}]`);
      params.set(key, value.join(','));
    } else if (typeof value === 'object' && value !== null) {
      if ((value.from !== undefined && value.from !== '') || (value.to !== undefined && value.to !== '')) {
        const rangeValue = [];
        if (value.from !== undefined && value.from !== '') rangeValue.push(`from:${value.from}`);
        if (value.to !== undefined && value.to !== '') rangeValue.push(`to:${value.to}`);
        if (rangeValue.length > 0) {
          console.log(`📊 Range filter: ${key} = ${rangeValue.join('|')}`);
          params.set(key, rangeValue.join('|'));
        }
      }
    } else if (typeof value === 'string' || typeof value === 'number') {
      console.log(`📝 Simple filter: ${key} = ${value}`);
      params.set(key, String(value));
    }
  });
  
  console.log('✅ Final URL params:', Object.fromEntries(params.entries()));
  return params;
};

export const urlParamsToFilters = (searchParams: URLSearchParams): any => {
  const filters: any = {};
  
  // قائمة الفلاتر التي يجب أن تكون دائماً arrays
  const arrayFilters = [
    'locations',
    'operationType',
    'propertyType',
    'condition',
    'ownershipType',
    'investmentType',
    'bedrooms',
    'bathrooms',
    'floor',
    'amenities'
  ];
  
  console.log('📥 Converting URL params to filters:', Object.fromEntries(searchParams.entries()));
  
  for (const [key, value] of searchParams.entries()) {
    // Skip tab and subCategory params
    if (key === 'tab' || key === 'subCategory') {
      console.log(`⏭️ Skipping system param: ${key}`);
      continue;
    }
    
    if (value.includes(',')) {
      // Array values
      console.log(`📋 Parsing array: ${key} = [${value}]`);
      filters[key] = value.split(',');
    } else if (value.includes('|')) {
      // Range values
      console.log(`📊 Parsing range: ${key} = ${value}`);
      const rangeObj: any = {};
      value.split('|').forEach(part => {
        if (part.startsWith('from:')) {
          const fromValue = part.substring(5);
          rangeObj.from = isNaN(Number(fromValue)) ? fromValue : Number(fromValue);
        } else if (part.startsWith('to:')) {
          const toValue = part.substring(3);
          rangeObj.to = isNaN(Number(toValue)) ? toValue : Number(toValue);
        }
      });
      filters[key] = rangeObj;
    } else {
      // Single values
      console.log(`📝 Parsing simple: ${key} = ${value}`);
      
      // التحقق من أن الفلتر يجب أن يكون array
      if (arrayFilters.includes(key)) {
        console.log(`🔄 Converting single value to array for ${key}: [${value}]`);
        filters[key] = [value];
      } else {
        const numValue = Number(value);
        filters[key] = isNaN(numValue) ? value : numValue;
      }
    }
  }
  
  console.log('✅ Final filters object:', filters);
  return filters;
};