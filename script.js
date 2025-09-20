// تبديل وضع الليل والنهار
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// إظهار/إخفاء القائمة على الأجهزة المحمولة
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    menuBtn.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// تأثير التمرير لشريط التنقل
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// تأثيرات الرسوم المتحركة عند التمرير
gsap.registerPlugin(ScrollTrigger);

gsap.utils
  .toArray(".skill-card, .project-card, .certificate-card")
  .forEach((item) => {
    gsap.fromTo(
      item,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

// نظام الترجمة وتبديل اللغة
const languageToggle = document.getElementById("language-toggle");
const htmlElement = document.getElementById("htmlElement");

// ترجمة النصوص
const translations = {
  ar: {
    nav_home: "الرئيسية",
    nav_about: "عنّي",
    nav_skills: "المهارات",
    nav_projects: "المشاريع",
    nav_certificates: "الشهادات",
    nav_contact: "اتصل بي",
    hero_name: "حسين الزعبي",
    hero_desc:
      "أحول الأفكار إلى تجارب ويب تفاعلية وجذابة باستخدام أحدث التقنيات",
    hero_btn_about: "مَن أكون",
    hero_btn_services: "خدماتي",
    about_title: "عنّي",
    about_greeting: "مرحبًا، أنا حسين",
    about_desc1:
      "مهندس و مطور شغوف في إنشاء تجارب ويب استثنائية , تحويل التصاميم إلى مواقع ويب تفاعلية وسريعة الاستجابة.",
    about_desc2:
      "أعمل حاليًا كمطور ويب مستقل، وأستمتع بالتعاون مع العملاء لتحقيق رؤيتهم وإنشاء حلول رقمية تلبي احتياجاتهم وتتجاوز توقعاتهم.",
    skills_title: "ما الذي أقوم به؟",
    projects_title: "مشاريعي",
    project1_desc:
      "منصة بيع الاثاث المتكاملة التي تدعم عرض الأثاث بتقنية الواقع المعزز ومزايا البحث من خلال الصورة",
    project2_desc:
      "تطبيق المرتل هو تطبيق يحوي تسجيلات القرآن الصوتية بقراءة التحقيق على شكل صفحات وهو تطبيق تعليمي",
    project3_desc:
      "لوحة تحكم متقدمة لعرض وتحليل البيانات مع رسوم بيانية تفاعلية وتقارير قابلة للتخصيص.",
    contact_title: "اتصل بي",
    contact_phone: "الهاتف",
    contact_email: "البريد الإلكتروني",
    contact_address: "العنوان",
    contact_location: "درعا, | الجمهورية العربية السورية",
    footer_name: "حسين الزعبي",
    footer_copyright: "♥️. MADE . WITH ©",
    language: "EN",
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_certificates: "Certificates",
    nav_contact: "Contact",
    hero_name: "Hussein Al-Zoubi",
    hero_desc:
      "I turn ideas into interactive and engaging web experiences using the latest technologies",
    hero_btn_about: "Who am I",
    hero_btn_services: "My Services",
    about_title: "About Me",
    about_greeting: "Hello, I'm Hussein",
    about_desc1:
      "A passionate engineer and developer in creating exceptional web experiences, transforming designs into interactive and responsive websites.",
    about_desc2:
      "I currently work as a freelance web developer, and I enjoy collaborating with clients to achieve their vision and create digital solutions that meet their needs and exceed their expectations.",
    skills_title: "What Do I Do?",
    projects_title: "My Projects",
    project1_desc:
      "An integrated furniture sales platform that supports augmented reality furniture display and image search features.",
    project2_desc:
      "Almuratel app is an application that contains audio recordings of the Quran in Tahqeeq recitation in the form of pages and is an educational application.",
    project3_desc:
      "An advanced dashboard for displaying and analyzing data with interactive charts and customizable reports.",
    contact_title: "Contact Me",
    contact_phone: "Phone",
    contact_email: "Email",
    contact_address: "Address",
    contact_location: "Daraa, | Syrian Arab Republic",
    footer_name: "Hussein Al-Zoubi",
    footer_copyright: "♥️. MADE . WITH ©",
    language: "AR",
  },
};

// دالة لتغيير اللغة
function setLanguage(lang) {
  // تغيير سمة الاتجاه
  htmlElement.dir = lang === "ar" ? "rtl" : "ltr";
  htmlElement.lang = lang;

  // تحديث النصوص
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });

  // حفظ اللغة المفضلة
  localStorage.setItem("language", lang);

  // تحديث زر اللغة
  const languageText = languageToggle.querySelector("span");
  languageText.textContent = translations[lang]["language"];
}

// تهيئة اللغة عند التحميل
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("language") || "ar";
  setLanguage(savedLanguage);
});

// تبديل اللغة عند النقر على الزر
languageToggle.addEventListener("click", () => {
  const currentLang = htmlElement.lang;
  const newLang = currentLang === "ar" ? "en" : "ar";
  setLanguage(newLang);
});
