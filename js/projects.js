// projects.js — Fully separated multilingual projects data

// Featured projects (using English titles as keys)
const featuredProjects = [
  'Alnssor Enterprise',
  'Chat Starter',
  'QR Generator Browser Extension',
  'AttendList'
];

// English projects
const projects_en = [
  {
    id: 'alnssorenterprise',
    title: 'Alnssor Enterprise',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/alnssorenterprise.png?raw=true',
    desc: 'A comprehensive website for Alnssor Enterprise showcasing their services and products.',
    link: 'https://alnssorenterprise.co/'
  },
  {
    id: 'qrgenerator',
    title: 'QR Generator',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/qr.png?raw=true',
    desc: 'A dynamic QR code generator tool enabling users to create customized QR codes.',
    link: 'https://qr.h190k.com'
  },
  {
    id: 'chatstarter',
    title: 'Chat Starter',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/wa.png?raw=true',
    desc: 'A tool to start chats with numbers without saving them on WhatsApp and Telegram.',
    link: 'https://wa.h190k.com'
  },
  {
    id: 'qrextension',
    title: 'QR Generator Browser Extension',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/qrextension.png?raw=true',
    desc: 'A Chrome-based extension for generating QR codes directly in your browser.',
    link: 'https://github.com/H190K/qrcodegeneratorbrowserExtension',
    button: 'Download Extension'
  },
  {
    id: 'checkip',
    title: 'Check IP with Geolocation',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/checkip.png?raw=true',
    desc: 'A simple tool to check your public IP address, location, and other geolocation details like country, city, and timezone.',
    link: 'https://checkip.h190k.com'
  },
  {
    id: 'ipcheck',
    title: 'IPCheck – Advanced IP Analysis',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/ipcheck.png?raw=true',
    desc: 'Detailed breakdown of your IP, ISP, and security insights. Different UI and deployed on Netlify.',
    link: 'https://ipcheck.h190k.com'
  },
  {
    id: 'attendlist',
    title: 'AttendList',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/attendlist.png?raw=true',
    desc: 'Automate attendance with instant QR codes; timestamped check-ins and CSV export.',
    link: 'https://attendlist.h190k.com'
  }
];

// Arabic projects
const projects_ar = [
  {
    id: 'alnssorenterprise',
    title: 'المؤسسة النسر',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/alnssorenterprise.png?raw=true',
    desc: 'موقع شامل لمؤسسة النسر يعرض خدماتهم ومنتجاتهم.',
    link: 'https://alnssorenterprise.co/'
  },
  {
    id: 'qrgenerator',
    title: 'مولد رمز الاستجابة السريعة',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/qr.png?raw=true',
    desc: 'أداة مولد رموز QR ديناميكية تتيح للمستخدمين إنشاء رموز مخصصة.',
    link: 'https://qr.h190k.com'
  },
  {
    id: 'chatstarter',
    title: 'بدء الدردشة',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/wa.png?raw=true',
    desc: 'أداة لبدء الدردشة مع أرقام بدون حفظها على واتساب وتليجرام.',
    link: 'https://wa.h190k.com'
  },
  {
    id: 'qrextension',
    title: 'إضافة متصفح لمولد رمز الاستجابة السريعة',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/qrextension.png?raw=true',
    desc: 'إضافة متصفح كروم لتوليد رموز QR مباشرة في متصفحك.',
    link: 'https://github.com/H190K/qrcodegeneratorbrowserExtension',
    button: 'تحميل الإضافة'
  },
  {
    id: 'checkip',
    title: 'التحقق من IP مع تحديد الموقع',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/checkip.png?raw=true',
    desc: 'أداة بسيطة للتحقق من عنوان IP العام الخاص بك، الموقع، وتفاصيل تحديد الموقع مثل الدولة، المدينة، والمنطقة الزمنية.',
    link: 'https://checkip.h190k.com'
  },
  {
    id: 'ipcheck',
    title: 'IPCheck – تحليل IP متقدم',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/ipcheck.png?raw=true',
    desc: 'تحليل تفصيلي لعنوان IP، مزود خدمة الإنترنت، ورؤى الأمان. واجهة مستخدم مختلفة ومُستضافة على Netlify.',
    link: 'https://ipcheck.h190k.com'
  },
  {
    id: 'attendlist',
    title: 'قائمة الحضور',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/attendlist.png?raw=true',
    desc: 'أتمتة الحضور باستخدام رموز QR الفورية؛ تسجيلات وقت الحضور وتصدير CSV.',
    link: 'https://attendlist.h190k.com'
  }
];

// Turkish projects
const projects_tr = [
  {
    id: 'alnssorenterprise',
    title: 'Alnssor Enterprise',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/alnssorenterprise.png?raw=true',
    desc: 'Alnssor Enterprise için hizmetlerini ve ürünlerini sergileyen kapsamlı bir web sitesi.',
    link: 'https://alnssorenterprise.co/'
  },
  {
    id: 'qrgenerator',
    title: 'QR Kod Üreteci',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/qr.png?raw=true',
    desc: 'Kullanıcıların özelleştirilmiş QR kodları oluşturmasına olanak tanıyan dinamik QR kod üretici aracı.',
    link: 'https://qr.h190k.com'
  },
  {
    id: 'chatstarter',
    title: 'Sohbet Başlatıcı',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/wa.png?raw=true',
    desc: 'WhatsApp ve Telegram\'da numaraları kaydetmeden sohbet başlatmak için bir araç.',
    link: 'https://wa.h190k.com'
  },
  {
    id: 'qrextension',
    title: 'QR Kod Üretici Tarayıcı Eklentisi',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/qrextension.png?raw=true',
    desc: 'Tarayıcınızda doğrudan QR kodları oluşturmak için Chrome tabanlı uzantı.',
    link: 'https://github.com/H190K/qrcodegeneratorbrowserExtension',
    button: 'Eklentiyi İndir'
  },
  {
    id: 'checkip',
    title: 'IP ve Konum Kontrolü',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/checkip.png?raw=true',
    desc: 'Genel IP adresinizi, konumunuzu ve ülke, şehir ve saat dilimi gibi diğer konum bilgilerini kontrol etmek için basit bir araç.',
    link: 'https://checkip.h190k.com'
  },
  {
    id: 'ipcheck',
    title: 'IPCheck – Gelişmiş IP Analizi',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/ipcheck.png?raw=true',
    desc: 'IP, ISS ve güvenlik bilgilerinize ilişkin ayrıntılı analiz. Farklı bir kullanıcı arayüzü ve Netlify\'de dağıtıldı.',
    link: 'https://ipcheck.h190k.com'
  },
  {
    id: 'attendlist',
    title: 'Katılım Listesi',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/attendlist.png?raw=true',
    desc: 'Anlık QR kodları ile katılımı otomatikleştirin; zaman damgalı girişler ve CSV dışa aktarımı.',
    link: 'https://attendlist.h190k.com'
  }
];

// Helpers to get featured projects for each language
function getFeaturedProjectsEN() {
  return projects_en.filter(p => featuredProjects.includes(p.title));
}
function getFeaturedProjectsAR() {
  // For Arabic, filter by id (because titles are translated)
  return projects_ar.filter(p => featuredProjects.some(title => {
    // Map English featured titles to Arabic equivalent for filter or use id:
    // Here using id for simplicity:
    return featuredProjects.includes(getEnglishTitleById(p.id));
  }));
}
function getFeaturedProjectsTR() {
  // Use id-based filtering for Turkish, just like Arabic, to avoid title mismatch
  return projects_tr.filter(p => featuredProjects.some(title => {
    // Map English featured titles to Turkish by id
    return featuredProjects.includes(getEnglishTitleById(p.id));
  }));
}

// Helper to get English title by project id (used in Arabic filtering)
function getEnglishTitleById(id) {
  const project = projects_en.find(p => p.id === id);
  return project ? project.title : null;
}

// Helpers for all
export { projects_en, projects_ar, projects_tr, getFeaturedProjectsEN, getFeaturedProjectsAR, getFeaturedProjectsTR };
