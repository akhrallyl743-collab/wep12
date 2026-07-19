/* =============================================
   START LINE — خط البداية — data.js
   جميع البيانات الثابتة مفصولة عن منطق التطبيق
   ============================================= */

const QUIZ_QUESTIONS = [
  { 
    cat:"الاهتمامات", 
    q:"في وقت فراغك، ماذا تفضل أن تفعل؟", 
    opts:["أصمم وأرسم أشياء جديدة","أبرمج أو أحل مسائل منطقية","أتكلم مع الناس وأبني علاقات","أقرأ أو أبحث وأتعلم"],
    // skills per option: [creative, technical, social, analytical, entrepreneurial]
    weights: [[3,0,0,0,1],[0,3,0,1,0],[0,0,3,0,1],[1,0,1,3,0]]
  },
  { 
    cat:"الشخصية", 
    q:"كيف تصف نفسك في بيئة العمل؟", 
    opts:["منفرد — أعمل بشكل مستقل وأركّز","اجتماعي — أحب التعاون والتفاعل","قائد — أتولى المسؤولية وأوجّه","منظّم — أتبع خطة واضحة"],
    weights: [[1,1,0,0,2],[0,0,3,0,0],[0,0,2,0,3],[0,1,0,3,0]]
  },
  { 
    cat:"الإبداع مقابل المنطق", 
    q:"أيهما يصفك أكثر؟", 
    opts:["أفكر بالألوان والأشكال والجمال","أفكر بالبيانات والأرقام والمنطق","أفكر بالناس ومشاعرهم واحتياجاتهم","أفكر بالاستراتيجيات والخطط الكبيرة"],
    weights: [[3,0,0,0,1],[0,2,0,3,0],[0,0,3,1,0],[0,1,1,2,3]]
  },
  { 
    cat:"المخاطرة", 
    q:"كيف تشعر تجاه المخاطرة في حياتك؟", 
    opts:["أحب التجربة حتى لو فشلت","أفضّل الأمان وأتجنب المجهول","أحسب المخاطر ثم أقرر","أحتاج وقتاً طويلاً قبل أي قرار"],
    weights: [[1,0,0,0,3],[0,1,0,2,0],[0,1,0,3,1],[0,1,0,2,0]]
  },
  { 
    cat:"التواصل", 
    q:"كيف تعبر عن أفكارك بشكل أفضل؟", 
    opts:["الكتابة والتدوين","الحديث والإلقاء","الرسم والتصميم","الأرقام والجداول والبيانات"],
    weights: [[1,0,2,2,0],[0,0,3,0,1],[3,0,1,0,0],[0,2,0,3,0]]
  },
  { 
    cat:"الطاقة", 
    q:"في أي بيئة تشعر بأعلى إنتاجية؟", 
    opts:["بيت هادئ بمفردي","مقهى فيه حياة وحركة","مكتب منظم مع زملاء","في أماكن جديدة ومتغيرة"],
    weights: [[1,2,0,1,0],[1,0,1,0,2],[0,1,2,1,0],[1,0,1,0,3]]
  },
  { 
    cat:"التركيز", 
    q:"كم من الوقت تستطيع التركيز على شيء واحد؟", 
    opts:["ساعات طويلة بسهولة","30-60 دقيقة ثم أحتاج راحة","20-30 دقيقة فقط","أنتقل بين مهام متعددة"],
    weights: [[0,3,0,2,0],[1,1,1,1,1],[1,0,1,0,1],[1,0,2,0,2]]
  },
  { 
    cat:"الأهداف", 
    q:"ما الذي يحفزك أكثر؟", 
    opts:["رؤية عملي يؤثر في حياة الناس","تحقيق استقلالية مالية ومرونة","الإبداع وترك بصمة جمالية","التقدم والنمو المستمر"],
    weights: [[0,0,3,1,1],[0,1,0,0,3],[3,0,1,0,1],[0,2,0,3,1]]
  },
  { 
    cat:"المهارات الحالية", 
    q:"ما المهارة التي تعتقد أنك أفضل فيها الآن؟", 
    opts:["الفن والتصميم والجماليات","البرمجة والتقنية","التواصل والإقناع","التحليل والتفكير النقدي"],
    weights: [[3,0,0,0,0],[0,3,0,1,0],[0,0,3,0,1],[0,1,1,3,0]]
  },
  { 
    cat:"الحلم", 
    q:"تخيّل نفسك بعد 5 سنوات — أين تريد أن تكون؟", 
    opts:["صاحب شركة أو مشروع خاص","متخصص معروف في مجاله","موظف ناجح في شركة كبيرة","فريلانسر حر يعمل من أي مكان"],
    weights: [[0,0,1,0,3],[1,2,0,2,0],[0,1,2,1,0],[1,1,1,0,2]]
  },
];

const CAREERS_DATA = [
  // ===== إبداعي =====
 
  { id:"graphic", name:"جرافيك ديزاين", cat:"إبداعي", icon:"✏️", desc:"إنشاء هويات بصرية مميزة — الفن الذي يبيع.",
    longDesc:"مصمم الجرافيك بيبني الهوية البصرية للشركات والعلامات التجارية من صفر — اللوغو، الألوان، الخطوط، والمطبوعات. بيعتمد على برامج Adobe Illustrator وPhotoshop، وبيشتغل مع عملاء متنوعين من كل الصناعات. مسار مناسب جداً للمبتدئين لأن الطلب عليه كبير في سوق الفريلانس العربي، وممكن تبدأ كسب دخل من أول 3 شهور.", difficulty:"سهل", time:"2-4 أشهر", match:85, salary:"800-3000$",
    tools:["Adobe Illustrator","Photoshop","Canva","InDesign","Affinity"],
    daily:["تصميم لوغوهات وهويات بصرية","مراجعة طلبات العملاء","البحث عن مصادر إلهام","تسليم ملفات بالمواصفات المطلوبة"],
    roadmap:[{t:"أساسيات الجرافيك",d:"نظرية الألوان والتنضيد"},{t:"Adobe Suite",d:"Illustrator & Photoshop"},{t:"هويات بصرية",d:"Logo + Brand Identity"},{t:"Portfolio",d:"10 مشاريع متنوعة"},{t:"منصات العمل",d:"Fiverr, Upwork, Khamsat"}],

    course:"https://www.canva.com/learn/", example:"مصمم جرافيك مبتدئ يكسب 500-1500$ شهرياً.",
    tracks:[{
      id:"graphic-design-track", title:"مصمم الجرافيك المحترف", subtitle:"هوية بصرية من الصفر",
      longDesc:"مسار الجرافيك ديزاين هيعلمك كيف تبني هويات بصرية كاملة للشركات والعلامات التجارية. هتبدأ بأساسيات نظرية التصميم والألوان، وتتعلم Adobe Photoshop بالتفصيل (8 أسابيع)، فـ Adobe Illustrator (8 أسابيع)، وتوصل لـ Adobe InDesign والتركيب الواقعي Realistic Composites (8 أسابيع) لمستوى احترافي في المطبوعات والدمج البصري. المسار بيركز على التطبيق العملي بمشاريع حقيقية تساعدك تبدأ شغل فريلانس أو تتقدم لشركات سريعاً.",
      level:"مبتدئ", duration:"24 أسبوع (~6 أشهر)", totalLessons:104, icon:"✏️", color:"#7c6dff", coverImage:"assets/cat-design.svg",
      intro:{
        tools:[
          {name:"Adobe Photoshop", purpose:"تحرير الصور والتصميمات النقطية", url:"https://www.adobe.com/products/photoshop.html"},
          {name:"Adobe Illustrator", purpose:"تصميم الشعارات والرسومات المتجهة", url:"https://www.adobe.com/products/illustrator.html"},
          {name:"Adobe InDesign", purpose:"تصميم المطبوعات والكتالوجات", url:"https://www.adobe.com/products/indesign.html"},
          {name:"Adobe Fonts", purpose:"مكتبة خطوط احترافية", url:"https://fonts.adobe.com/"}
        ],
        accounts:[
          {name:"Behance", why:"عرض أعمالك للعالم", url:"https://www.behance.net/"},
          {name:"Dribbble", why:"مجتمع المصممين الأشهر", url:"https://dribbble.com/"},
          {name:"LinkedIn", why:"التواصل المهني", url:"https://www.linkedin.com/"}
        ],
        plan:[
          {title:"Level 1: Photoshop", duration:"8 أسابيع", goal:"أساسيات التصميم، واجهة فوتوشوب، التحديد والإخفاء، تعديل الصور، الموك أب"},
          {title:"Level 2: Illustrator", duration:"8 أسابيع", goal:"الأشكال والتلوين، الكتابة، تصميم اللوجو، أداة القلم، أدوات متقدمة"},
          {title:"Level 3: InDesign & Composites", duration:"8 أسابيع", goal:"تصميم المطبوعات، التركيب الواقعي، الإضاءة والظل، مشاريع تطبيقية شاملة"}
        ],
        challenge:[
          {name:"Behance", url:"https://www.behance.net/"},
          {name:"Dribbble", url:"https://dribbble.com/"},
          {name:"99designs", url:"https://99designs.com/"}
        ]
      },
      courses:[
        { id:"gd-l1-week1", title:"Level 1 (Photoshop) - الأسبوع 1: أساسيات التصميم الجرافيكي", duration:"أسبوع", lessons:[
          {id:"gd-ps-w1-02", title:"02 - نظم الالوان و انواع الصيغ للصور - Photoshop Course l color systems & image type", duration:"7:31", type:"فيديو", videoUrl:"https://www.youtube.com/embed/_i21QKGFivM"},
          {id:"gd-ps-w1-03", title:"03 - كورس فوتوشوب كامل - Photoshop Course l Resolution & 8 Bit or 16 Bit or 32 Bit", duration:"8:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/0ebKkwr5JXE"},
          {id:"gd-ps-w1-04", title:"الفرق بين الفيكتور و الراستر - Vector VS Raster", duration:"11:00", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-yhDeEwwKec"},
          {id:"gd-ps-w1-topics", title:"أساسيات التصميم: مبادئ التصميم، الألوان، الطباعة، الأشكال، البكسل، Vector vs Raster", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/embed/_i21QKGFivM"}
        ]},
        { id:"gd-l1-week2", title:"Level 1 (Photoshop) - الأسبوع 2: واجهة فوتوشوب والأشكال", duration:"أسبوع", lessons:[
          {id:"gd-ps-w2-05", title:"05 - كورس فوتوشوب :: واجهه البرنامج و نظام الطبقات - Photoshop Course l Interface & Layers", duration:"14:00", type:"فيديو", videoUrl:"https://www.youtube.com/embed/3xsMwzVnI2g"},
          {id:"gd-ps-w2-06", title:"06 - كورس فوتوشوب  :: اداه رسم الاشكال - Photoshop Course l Rectangle Tool", duration:"14:39", type:"فيديو", videoUrl:"https://www.youtube.com/embed/PJivWEHahFU"},
          {id:"gd-ps-w2-07", title:"07 - اداه الاصطفاف و رسم الاشكال :: كورس فوتوشوب - Photoshop Course l Align & Rectangle Tool", duration:"20:50", type:"فيديو", videoUrl:"https://www.youtube.com/embed/vRUU9q27UkE"},
          {id:"gd-ps-w2-08", title:"08 - حل تمرين رسم الاشكال :: كورس فوتوشوب - Photoshop Course l Task 1 Solution", duration:"20:12", type:"فيديو", videoUrl:"https://www.youtube.com/embed/k0xX1ZgHV88"},
          {id:"gd-ps-w2-09", title:"09 - شرح الطبقات ::  كورس فوتوشوب -  Photoshop Course l Layers Opacity, Fill and Style", duration:"13:08", type:"فيديو", videoUrl:"https://www.youtube.com/embed/AY--1F6Gsr4"}
        ]},
        { id:"gd-l1-week3", title:"Level 1 (Photoshop) - الأسبوع 3: الأدوات الأساسية (Typing, Brush, Crop)", duration:"أسبوع", lessons:[
          {id:"gd-ps-w3-10", title:"10 -  الكتابه بالعربى و الانجليزى :: كورس فوتوشوب - Photoshop Course l Typing", duration:"12:03", type:"فيديو", videoUrl:"https://www.youtube.com/embed/W_DhGoP_WhE"},
          {id:"gd-ps-w3-11", title:"11 -  حل جميع مشاكل الكتابه :: كورس فوتوشوب - Photoshop Course l Typing Problems", duration:"14:53", type:"فيديو", videoUrl:"https://www.youtube.com/embed/3kQ2YXB-08Y"},
          {id:"gd-ps-w3-12", title:"12 - اداه الفرشه و الممحاه :: كورس فوتوشوب - Photoshop Course l Brush & Eraser Tool", duration:"15:50", type:"فيديو", videoUrl:"https://www.youtube.com/embed/zHe8aaS7fAE"},
          {id:"gd-ps-w3-13", title:"13 -  القطاره،الاقتصاص،التدرج :: كورس فوتوشوب - Photoshop Course l Eye dropper, Crop & Gradient Tool", duration:"14:17", type:"فيديو", videoUrl:"https://www.youtube.com/embed/OXI3_5i9OTk"}
        ]},
        { id:"gd-l1-week4", title:"Level 1 (Photoshop) - الأسبوع 4: أدوات التحديد (Pen Tool, Selection)", duration:"أسبوع", lessons:[
          {id:"gd-ps-w4-14", title:"14 -  اداه القلم للرسم :: كورس فوتوشوب - Photoshop Course l Pen tool", duration:"28:06", type:"فيديو", videoUrl:"https://www.youtube.com/embed/pxaR0EgZCuI"},
          {id:"gd-ps-w4-15", title:"15 - حل تمرين اداه القلم ::  كورس فوتوشوب - Photoshop Course l Pen tool Exercise", duration:"16:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/tyiTto_Okb0"},
          {id:"gd-ps-w4-16", title:"16 - التحديد :: كورس فوتوشوب  - Photoshop Course l Selection", duration:"15:44", type:"فيديو", videoUrl:"https://www.youtube.com/embed/oK08VsOdV5k"}
        ]},
        { id:"gd-l1-week5", title:"Level 1 (Photoshop) - الأسبوع 5: الإخفاء والقناع (Masking)", duration:"أسبوع", lessons:[
          {id:"gd-ps-w5-17", title:"17 - الاخفاء ::  كورس فوتوشوب - Photoshop Course l Masking", duration:"20:37", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ij_YEMAgSD4"},
          {id:"gd-ps-w5-18", title:"18 - كورس فوتوشوب - Photoshop Course l Adjustment Layer & Texture - Manipulation Tutorial", duration:"22:31", type:"فيديو", videoUrl:"https://www.youtube.com/embed/0u7pTcbNA4c"}
        ]},
        { id:"gd-l1-week6", title:"Level 1 (Photoshop) - الأسبوع 6: تعديل الصور (Photo Editing)", duration:"أسبوع", lessons:[
          {id:"gd-ps-w6-19", title:"19- ريتاتش تعديل الصور الجزء الاول :: كورس فوتوشوب - Photoshop Course l Retouch Tutorial", duration:"20:14", type:"فيديو", videoUrl:"https://www.youtube.com/embed/hKesiU09Oq4"},
          {id:"gd-ps-w6-20", title:"20- تعديل الصور الجزء الثانى :: تعديل البشره باحترافيه و سرعه -Nik Collection & Portraiture -Plugins", duration:"33:51", type:"فيديو", videoUrl:"https://www.youtube.com/embed/yZVVQ3CYMZ8"}
        ]},
        { id:"gd-l1-week7", title:"Level 1 (Photoshop) - الأسبوع 7: التصميم والموك أب", duration:"أسبوع", lessons:[
          {id:"gd-ps-w7-21", title:"21 - تصميم كارت شخصى ( خطوات انشاء التصميم ) - Design business card in Photoshop", duration:"27:15", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ljK6y2EN9Q4"},
          {id:"gd-ps-w7-22", title:"22 - شرح الموك اب :: اعرض تصميماتك باحترافيه ( مرفق التحميلات ) - What is Mockup in Photoshop", duration:"8:24", type:"فيديو", videoUrl:"https://www.youtube.com/embed/blGXwwM45CE"}
        ]},
        { id:"gd-l1-week8", title:"Level 1 (Photoshop) - الأسبوع 8: تصميم السوشيال ميديا (تطبيق)", duration:"أسبوع", lessons:[
          {id:"gd-ps-w8-23", title:"23 - وفر وقت و مجهود كبير | 3 استخدامات للأكشن فى الفوتوشوب - How to use Actions in Photoshop CC", duration:"20:46", type:"فيديو", videoUrl:"https://www.youtube.com/embed/3YN3rHyVXvA"},
          {id:"gd-ps-w8-24", title:"24 - اداة المسطره و الشبكه فى الفوتوشوب  - Rulers Grids and Guides in Photoshop CC", duration:"18:15", type:"فيديو", videoUrl:"https://www.youtube.com/embed/5gT5bi1cHlo"},
          {id:"gd-ps-w8-task", title:"تدريب: تصميم بوست لوسائل التواصل الاجتماعي (Social Media Design)", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/embed/3YN3rHyVXvA"}
        ]},
        { id:"gd-l1-extra", title:"إضافي: تقييم تصميمات وموارد مجانية للمصمم", duration:"—", lessons:[
          {id:"gd-ps-extra-01", title:"تقييم تصميمات: مسابقة تصميم غلاف كتاب", duration:"15:23", type:"فيديو", videoUrl:"https://www.youtube.com/embed/a4q2x7z4CTk"},
          {id:"gd-ps-extra-02", title:"مواقع مجانية مهمة لأي مصمم جرافيك (قوالب، فيكتور، خطوط عربية، صور)", duration:"25:23", type:"فيديو", videoUrl:"https://www.youtube.com/embed/f2b9lnmivKg"}
        ]},
        { id:"gd-l2-week1", title:"Level 2 (Illustrator) - الأسبوع 1: مراجعة أساسيات التصميم", duration:"أسبوع", lessons:[
          {id:"gd-ill-w1-topics", title:"مراجعة: أساسيات التصميم الجرافيكي (نفس الأسبوع الأول من Photoshop)", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/embed/_i21QKGFivM"}
        ]},
        { id:"gd-l2-week2", title:"Level 2 (Illustrator) - الأسبوع 2: مقدمة إليستريتور", duration:"أسبوع", lessons:[
          {id:"gd-ill-w2-02", title:"02 - واجهة البرنامج وبداية اول مشروع | اليستريتور - Interface & Creating new document", duration:"39:11", type:"فيديو", videoUrl:"https://www.youtube.com/embed/YPicVGhPV1o"},
          {id:"gd-ill-w2-03", title:"03 - المشروع كامل فى ملف واحد | اليستريتور - Working with Artboards in Illustrator", duration:"18:00", type:"فيديو", videoUrl:"https://www.youtube.com/embed/og7rGBogUxk"},
          {id:"gd-ill-w2-04", title:"04 - تنظيم الطبقات والعناصر فى المشروع | اليستريتور - Selection and Organization in Illustrator", duration:"18:28", type:"فيديو", videoUrl:"https://www.youtube.com/embed/N_njJBDkKiM"},
          {id:"gd-ill-w2-05", title:"05 - اصطفاف وتوزيع العناصر ورسم الاشكال | اليستريتور - Align & Distribution in Illustrator", duration:"16:01", type:"فيديو", videoUrl:"https://www.youtube.com/embed/wRQ77FcTApw"},
          {id:"gd-ill-w2-06", title:"06 - حل تمرين رسم الأشكال | اليستريتور - Illustrator Course", duration:"12:05", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Z3RSFoazZhg"}
        ]},
        { id:"gd-l2-week3", title:"Level 2 (Illustrator) - الأسبوع 3: الأشكال والتلوين", duration:"أسبوع", lessons:[
          {id:"gd-ill-w3-07", title:"07 - الانماط المختلفة للأشكال | اليستريتور - Appearance Panel & Graphic Styles in Illustrator", duration:"18:54", type:"فيديو", videoUrl:"https://www.youtube.com/embed/GysZ02AFzXw"},
          {id:"gd-ill-w3-08", title:"08 - التأثيرات فى الاليستريتور - Effects in Adobe Illustrator CC", duration:"20:50", type:"فيديو", videoUrl:"https://www.youtube.com/embed/bplCbrPj1iI"},
          {id:"gd-ill-w3-09", title:"09 - التدرج اللوني فى الاليستريتور - Gradient Tool in Adobe Illustrator CC", duration:"15:09", type:"فيديو", videoUrl:"https://www.youtube.com/embed/q8vLPCj-vmA"}
        ]},
        { id:"gd-l2-week4", title:"Level 2 (Illustrator) - الأسبوع 4: الكتابة والنصوص", duration:"أسبوع", lessons:[
          {id:"gd-ill-w4-19", title:"19 - الكتابة باللغة العربية والانجليزية فى الاليستريتور - How to Type in Adobe Illustrator", duration:"26:48", type:"فيديو", videoUrl:"https://www.youtube.com/embed/tdxQ7t85JO0"},
          {id:"gd-ill-w4-20", title:"20 - اساليب الكتابة المختلفة فى الاليسترتور | الكتابة على منحنى وابتعاد النص عن الاشكال", duration:"19:57", type:"فيديو", videoUrl:"https://www.youtube.com/embed/P5Jkdan2Bxc"},
          {id:"gd-ill-w4-task", title:"تدريب: تصميم كارت شخصي (Business Card)", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/embed/tdxQ7t85JO0"}
        ]},
        { id:"gd-l2-week5", title:"Level 2 (Illustrator) - الأسبوع 5: مدخل لتصميم اللوجو", duration:"أسبوع", lessons:[
          {id:"gd-ill-w5-10", title:"10 - تكوين الأشكال المتداخله فى الاليستريتور - Shape Builder Tool in Adobe Illustrator CC", duration:"16:53", type:"فيديو", videoUrl:"https://www.youtube.com/embed/8l6ipL1Cw2E"},
          {id:"gd-ill-w5-task", title:"تدريب: تصميم لوجو بسيط باستخدام Golden Ratio", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/embed/8l6ipL1Cw2E"}
        ]},
        { id:"gd-l2-week6", title:"Level 2 (Illustrator) - الأسبوع 6: الرسم والتلوين", duration:"أسبوع", lessons:[
          {id:"gd-ill-w6-11", title:"11 - الرسم فى الاليستريتور - Drawing with Paint Brush & Pencil Tool in Illustrator", duration:"14:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/hoF3Wy5UcxA"},
          {id:"gd-ill-w6-12", title:"12 - بالخطوات طريقة رسم الاشكال فى الاليستريتور - Drawing Exercise in Illustrator", duration:"16:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/HizvNZDd924"},
          {id:"gd-ill-w6-13", title:"13 - التلوين فى الاليستريتور - Coloring in Illustrator", duration:"16:26", type:"فيديو", videoUrl:"https://www.youtube.com/embed/fi7CsG-z1v8"}
        ]},
        { id:"gd-l2-week7", title:"Level 2 (Illustrator) - الأسبوع 7: أداة القلم Pen Tool", duration:"أسبوع", lessons:[
          {id:"gd-ill-w7-14", title:"14 - إتقان الرسم بالقلم فى الاليستريتور بتمارين قوية - Mastering Pen Tool in Illustrator", duration:"23:40", type:"فيديو", videoUrl:"https://www.youtube.com/embed/j4qaOwUEWL0"},
          {id:"gd-ill-w7-15", title:"15 - اداوت مهمة مساعدة للرسم فى الاليستريتور  - Drawing Assistance Tools in Illustrator", duration:"20:10", type:"فيديو", videoUrl:"https://www.youtube.com/embed/qOK5_iXX2tI"},
          {id:"gd-ill-w7-16", title:"16 - بدائل رسم المنحنيات فى الاليستريتور - Pen tool alternatives in Adobe illustrator", duration:"12:29", type:"فيديو", videoUrl:"https://www.youtube.com/embed/d_zojT0vNDg"},
          {id:"gd-ill-w7-17", title:"17 - أدوات تشكيل العناصر فى الاليستريتور - Distort Tools in Adobe illustrator", duration:"11:54", type:"فيديو", videoUrl:"https://www.youtube.com/embed/stAQjXv4bLs"}
        ]},
        { id:"gd-l2-week8", title:"Level 2 (Illustrator) - الأسبوع 8: أدوات متقدمة", duration:"أسبوع", lessons:[
          {id:"gd-ill-w8-26", title:"26 - التلوين بمستوى متقدم من اسرار قوة الاليستريتور - Gradient Mesh Tool in Illustrator", duration:"9:49", type:"فيديو", videoUrl:"https://www.youtube.com/embed/9sXW_EN5onU"},
          {id:"gd-ill-w8-27", title:"27 - كيفية الرسم الاحترافي وصناعة اللوجوهات بالخطوات في الاليستريتور | Drawing in Illustrator", duration:"19:24", type:"فيديو", videoUrl:"https://www.youtube.com/embed/DgRi6javmlk"},
          {id:"gd-ill-w8-28", title:"28 - تحويل اى صورة او لوجو من راستر الي فيكتور - Image Trace in Adobe Illustrator CC", duration:"14:41", type:"فيديو", videoUrl:"https://www.youtube.com/embed/WwDPvTjUNIs"},
          {id:"gd-ill-w8-29", title:"اسهل طريقة لتشكيل العناصر فى الفوتوشوب والاليستريتور - Puppet Warp in Photoshop & Illustrator", duration:"8:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/wr7h1uzKLEw"},
          {id:"gd-ill-w8-30", title:"خطوات ومهارات الرسم على الاليستريتور بتنفيذ رسمة الباندا - Drawing Panda in Illustrator", duration:"18:47", type:"فيديو", videoUrl:"https://www.youtube.com/embed/PoE7vdik4Vo"}
        ]},
        { id:"gd-l2-extra", title:"إضافي: المانديلا، الفرش، إعادة التلوين، السيمبول، أداة الدمج", duration:"—", lessons:[
          {id:"gd-ill-extra-18", title:"18 - رسم المانديلا والأشكال المتماثلة فى الاليستريتور - Symmetrical Mandala Design in Illustrator", duration:"23:03", type:"فيديو", videoUrl:"https://www.youtube.com/embed/LGBcONQNvrw"},
          {id:"gd-ill-extra-21", title:"21 - الاخفاء فى الاليستريتور | Masking in Illustrator - Clipping & Opacity Mask", duration:"23:22", type:"فيديو", videoUrl:"https://www.youtube.com/embed/uBOW1pLZj3g"},
          {id:"gd-ill-extra-22", title:"22 - الفرش في الاليستريتور | Calligraphic, Scatter, Art, Bristle & Pattern Brushes in Illustrator", duration:"28:54", type:"فيديو", videoUrl:"https://www.youtube.com/embed/xVCmhcXUjKs"},
          {id:"gd-ill-extra-23", title:"23 - اعادة التلوين للاشكال والتصماميم بخطوة بسيطه فى الاليستريتور - Recolor Artwork in Illustrator", duration:"15:09", type:"فيديو", videoUrl:"https://www.youtube.com/embed/b2Wv9MJQeyE"},
          {id:"gd-ill-extra-24", title:"24 -  السيمبول :: الرموز فى الاليستريتور -  Symbols in Adobe Illustrator CC", duration:"18:32", type:"فيديو", videoUrl:"https://www.youtube.com/embed/CRfRwfc-6_Q"},
          {id:"gd-ill-extra-25", title:"25 - تطبيق تأثيرات مبهره باستخدام أداة الدمج فى الاليستريتور - BLEND TOOL in Adobe Illustrator", duration:"13:32", type:"فيديو", videoUrl:"https://www.youtube.com/embed/pBdZvTU9PK8"}
        ]},
        { id:"gd-l3-week1", title:"Level 3 (InDesign) - الأسبوع 1: مقدمة InDesign", duration:"أسبوع", lessons:[
          {id:"gd-ind-w1-01", title:"InDesign (الساعة الأولى) — مع ترجمة", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/RXRT3dHu6_o"}
        ]},
        { id:"gd-l3-week2", title:"Level 3 (InDesign) - الأسبوع 2: استكمال InDesign", duration:"أسبوع", lessons:[
          {id:"gd-ind-w2-task", title:"مهمة: استكمال InDesign — النصوص، استيراد ملفات Word، الأنماط، الصور، Clipping Path، Text Wrap", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/embed/RXRT3dHu6_o"}
        ]},
        { id:"gd-l3-week3", title:"Level 3 (Composites) - الأسبوع 3: مقدمة وPerspective وColor Matching", duration:"أسبوع", lessons:[
          {id:"gd-comp-w3-01", title:"01   Introduction Presentation 1", duration:"19:45", type:"فيديو", videoUrl:"https://www.youtube.com/embed/cjRCAhuNJRg"},
          {id:"gd-comp-w3-02", title:"02   Perspective", duration:"8:32", type:"فيديو", videoUrl:"https://www.youtube.com/embed/PXuHNVQFRzg"},
          {id:"gd-comp-w3-03", title:"03   Explain Colors", duration:"5:33", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ijU2ITvABv0"},
          {id:"gd-comp-w3-04", title:"04   Color Matching Part 1", duration:"9:24", type:"فيديو", videoUrl:"https://www.youtube.com/embed/KyeZy27EM0Y"},
          {id:"gd-comp-w3-05", title:"05   Color Matching Part 2", duration:"5:59", type:"فيديو", videoUrl:"https://www.youtube.com/embed/z_4NqlOfKCc"},
          {id:"gd-comp-w3-06", title:"06   Color Matching Part 3", duration:"10:41", type:"فيديو", videoUrl:"https://www.youtube.com/embed/qllBlg1x92Y"},
          {id:"gd-comp-w3-07", title:"07   Explain Shadow", duration:"10:51", type:"فيديو", videoUrl:"https://www.youtube.com/embed/MfS8V60oN0k"}
        ]},
        { id:"gd-l3-week4", title:"Level 3 (Composites) - الأسبوع 4: الظل (Shadow)", duration:"أسبوع", lessons:[
          {id:"gd-comp-w4-08", title:"08   Contact Shadow Occlusion Shadow", duration:"7:54", type:"فيديو", videoUrl:"https://www.youtube.com/embed/3__J46goP5g"},
          {id:"gd-comp-w4-09", title:"09   Cast Shadow Part 1", duration:"5:12", type:"فيديو", videoUrl:"https://www.youtube.com/embed/QPQaZskBnA8"},
          {id:"gd-comp-w4-10", title:"010   Cast Shadow Part 2", duration:"9:36", type:"فيديو", videoUrl:"https://www.youtube.com/embed/wNUNDbhKLN8"},
          {id:"gd-comp-w4-11", title:"011   Cast Shadow Part 3", duration:"3:33", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ZJnSY8uF1I4"},
          {id:"gd-comp-w4-12", title:"012   Cast Shadow Part 4", duration:"8:56", type:"فيديو", videoUrl:"https://www.youtube.com/embed/UX3TXWaWCUc"},
          {id:"gd-comp-w4-13", title:"013   Explain Rim Light", duration:"4:54", type:"فيديو", videoUrl:"https://www.youtube.com/embed/7LYmJdeO2fM"}
        ]},
        { id:"gd-l3-week5", title:"Level 3 (Composites) - الأسبوع 5: إضاءة الحافة (Rim Light)", duration:"أسبوع", lessons:[
          {id:"gd-comp-w5-14", title:"014   Rim Light Part 1", duration:"5:47", type:"فيديو", videoUrl:"https://www.youtube.com/embed/iLgC9_uGcbA"},
          {id:"gd-comp-w5-15", title:"015   Rim Light Part 2", duration:"7:48", type:"فيديو", videoUrl:"https://www.youtube.com/embed/tL_EXl8DUVI"},
          {id:"gd-comp-w5-16", title:"016   Rim Light Part 3", duration:"6:19", type:"فيديو", videoUrl:"https://www.youtube.com/embed/6w-9W38hZPw"},
          {id:"gd-comp-w5-17", title:"017   Rim light Part 4", duration:"13:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/X-qXoEpyJLE"},
          {id:"gd-comp-w5-18", title:"018    journey to the argonath lands (01 ideation)", duration:"6:52", type:"فيديو", videoUrl:"https://www.youtube.com/embed/rRxBf8ByWW4"}
        ]},
        { id:"gd-l3-week6", title:"Level 3 (Composites) - الأسبوع 6: تطبيق شامل 1", duration:"أسبوع", lessons:[
          {id:"gd-comp-w6-19", title:"019    journey to the argonath lands (02 Journey Layout)", duration:"18:22", type:"فيديو", videoUrl:"https://www.youtube.com/embed/6fuC7J5-Ig4"},
          {id:"gd-comp-w6-20", title:"020    journey to the argonath lands (03 Journey Blending)", duration:"11:26", type:"فيديو", videoUrl:"https://www.youtube.com/embed/JNiqBQXH5i0"},
          {id:"gd-comp-w6-21", title:"021    journey to the argonath lands (04 Journey Colors)", duration:"19:12", type:"فيديو", videoUrl:"https://www.youtube.com/embed/8WIi-zdVqDg"},
          {id:"gd-comp-w6-22", title:"022    journey to the argonath lands (05 Journey details)", duration:"16:01", type:"فيديو", videoUrl:"https://www.youtube.com/embed/KciKcJQJXOc"},
          {id:"gd-comp-w6-23", title:"023    journey to the argonath lands (06 Journey CC)", duration:"3:31", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ja4BKC9oJho"},
          {id:"gd-comp-w6-24", title:"024    Alone in the jungle (01 Jungle Layout)", duration:"11:33", type:"فيديو", videoUrl:"https://www.youtube.com/embed/M6uWA7KkiJQ"},
          {id:"gd-comp-w6-task", title:"تدريب: تصميم كامل بكل التفاصيل المشروحة (19-24)", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/embed/6fuC7J5-Ig4"}
        ]},
        { id:"gd-l3-week7", title:"Level 3 (Composites) - الأسبوع 7: تطبيق شامل 2", duration:"أسبوع", lessons:[
          {id:"gd-comp-w7-25", title:"025    Alone in the jungle (02 Jungle Blending)", duration:"6:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/bDkdAYcMAUE"},
          {id:"gd-comp-w7-26", title:"026    Alone in the jungle (03 Jungle Colors)", duration:"9:32", type:"فيديو", videoUrl:"https://www.youtube.com/embed/iewoVDq_FKI"},
          {id:"gd-comp-w7-27", title:"027    Alone in the jungle (04 Jungle Lighting)", duration:"16:40", type:"فيديو", videoUrl:"https://www.youtube.com/embed/SObUHTLjYSk"},
          {id:"gd-comp-w7-28", title:"028    Alone in the jungle (05 Jungle CC)", duration:"8:54", type:"فيديو", videoUrl:"https://www.youtube.com/embed/YO7nib_IsoY"},
          {id:"gd-comp-w7-29", title:"029   Aliens Battle (01 Battle Layout)", duration:"11:49", type:"فيديو", videoUrl:"https://www.youtube.com/embed/QeCUbCEFiWU"},
          {id:"gd-comp-w7-task", title:"تدريب: تصميم كامل بكل التفاصيل المشروحة (25-29)", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/embed/bDkdAYcMAUE"}
        ]},
        { id:"gd-l3-week8", title:"Level 3 (Composites) - الأسبوع 8: تطبيق شامل 3", duration:"أسبوع", lessons:[
          {id:"gd-comp-w8-30", title:"030   Aliens Battle (02 Battle Blending)", duration:"8:17", type:"فيديو", videoUrl:"https://www.youtube.com/embed/suGMfyl1jzo"},
          {id:"gd-comp-w8-31", title:"031   Aliens Battle (03 Battle Detailing)", duration:"9:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Lj0hHpNv10U"},
          {id:"gd-comp-w8-32", title:"032   Aliens Battle (04 Battle Shadows)", duration:"9:34", type:"فيديو", videoUrl:"https://www.youtube.com/embed/71BWaODd1PI"},
          {id:"gd-comp-w8-33", title:"033   Aliens Battle (05 Battle Lighting)", duration:"13:19", type:"فيديو", videoUrl:"https://www.youtube.com/embed/7lIrfEI6tug"},
          {id:"gd-comp-w8-34", title:"034   Aliens Battle (06 Battle CC)", duration:"7:12", type:"فيديو", videoUrl:"https://www.youtube.com/embed/xWM-6qhwoqU"},
          {id:"gd-comp-w8-35", title:"035    What Is The Matte Painting", duration:"10:48", type:"فيديو", videoUrl:"https://www.youtube.com/embed/5Gr4iCfkHYI"},
          {id:"gd-comp-w8-task", title:"تدريب: تصميم كامل بكل التفاصيل المشروحة (30-35)", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/embed/suGMfyl1jzo"}
        ]},
        { id:"gd-l3-extra", title:"إضافي: مشروع Backpacker الكامل (Matte Painting)", duration:"—", lessons:[
          {id:"gd-comp-extra-36", title:"036   Backpacker (02 Forest Layout)", duration:"4:43", type:"فيديو", videoUrl:"https://www.youtube.com/embed/s7aqKpUkbdg"},
          {id:"gd-comp-extra-37", title:"037   Backpacker (03 Forest Blending)", duration:"4:28", type:"فيديو", videoUrl:"https://www.youtube.com/embed/W5EIMJt0fiM"},
          {id:"gd-comp-extra-38", title:"038   Backpacker (04 Forest Colors)", duration:"8:53", type:"فيديو", videoUrl:"https://www.youtube.com/embed/PfDIKp_cVec"},
          {id:"gd-comp-extra-39", title:"039   Backpacker (05 Forest Detailing)", duration:"5:09", type:"فيديو", videoUrl:"https://www.youtube.com/embed/xluwTK4vDCU"},
          {id:"gd-comp-extra-40", title:"040   Backpacker (06 Forest CC)", duration:"4:33", type:"فيديو", videoUrl:"https://www.youtube.com/embed/f0ziyCV5PUQ"}
        ]},
      ]
    }]
  },
     { id:"ui-ux", name:"مصمم UI/UX", cat:"إبداعي", icon:"🎨", desc:"تصميم تجارب مستخدم رقمية رائعة — الجسر بين الإنسان والتقنية.",
    longDesc:"مصمم UI/UX هو الشخص اللي بيقرر إزاي يبدو التطبيق أو الموقع وإزاي يتعامل معاه المستخدم. UI هو شكل الواجهة، وUX هو التجربة الكاملة للمستخدم. بيستخدم Figma لتصميم النماذج، وبيعمل أبحاث على المستخدمين عشان يفهم احتياجاتهم. من أعلى الرواتب في قطاع التصميم.", difficulty:"متوسط", time:"3-6 أشهر", match:92, salary:"2000-6000$",
    tools:["Figma","Adobe XD","Maze","Miro","Zeplin" ],
    daily:["تصميم واجهات التطبيقات","إجراء أبحاث المستخدمين","بناء نماذج أولية","التعاون مع المطورين","اختبار التجربة مع مستخدمين حقيقيين"],
    roadmap:[{t:"أساسيات التصميم",d:"مبادئ الألوان والطباعة والتخطيط"},{t:"احتراف Figma",d:"أشهر أداة تصميم في العالم"},{t:"Portfolio أول",d:"صمم 3 مشاريع وهمية احترافية"},{t:"أبحاث المستخدم",d:"تعلم كيف تفهم احتياجات المستخدم"},{t:"أول عميل",d:"Upwork أو Behance أو شبكتك الشخصية"}],
    course:"https://www.figma.com/resources/learn-design/", example:"مصمم في Airbnb يبدأ براتب 3000$+ شهرياً.",
    tracks:[{
      id:"ui-ux-track", title:"UIUX Roadmap 2026", subtitle:"من الفكرة إلى النموذج القابل للاختبار",
      longDesc:"خارطة طريق UI/UX الكاملة: تبدأ بكورس أساسي شامل لتعلّم UI Design و Figma من الصفر (21 حلقة)، ثم 31 أسبوع مقسّمة لـ3 مستويات. Beginner (9 أسابيع): أساسيات UI/UX، مبادئ التصميم البصري، Figma، الـ Wireframes. Intermediate (10 أسابيع): UX Basics، Design Thinking، Components & Variants، Design Systems، الاستجابة للشاشات المختلفة. Advanced (11 أسبوع): بحث المستخدم الكامل (User Research، Personas، Journey Maps)، حتى الـ Prototyping والاختبار وتسليم Case Study حقيقي.",
      level:"مبتدئ → متقدم", duration:"31 أسبوع (~8 أشهر)", totalLessons:121, icon:"🎨", color:"#e8502a", coverImage:"assets/2.jpg",
      intro:{
        tools:[
          {name:"Figma", purpose:"تصميم الواجهات والنماذج", url:"https://www.figma.com/"},
          {name:"Adobe XD", purpose:"تصميم وتجريب تجارب المستخدم", url:"https://www.adobe.com/products/xd.html"},
          {name:"Maze", purpose:"اختبار قابلية الاستخدام", url:"https://maze.co/"},
          {name:"Miro", purpose:"خرائط رحلة المستخدم والعصف الذهني", url:"https://miro.com/"}
        ],
        accounts:[
          {name:"Behance", why:"عرض مشاريع التصميم", url:"https://www.behance.net/"},
          {name:"Dribbble", why:"مجتمع UI/UX الأشهر", url:"https://dribbble.com/"},
          {name:"LinkedIn", why:"التواصل المهني وفرص العمل", url:"https://www.linkedin.com/"}
        ],
        plan:[
          {title:"كورس أساسي: UI Design & Figma", duration:"21 حلقة", goal:"أساسيات UI Design وتعلّم واجهة Figma بالكامل"},
          {title:"Beginner Level", duration:"9 أسابيع", goal:"مبادئ التصميم البصري، Figma، Auto Layout، Wireframes"},
          {title:"Intermediate Level", duration:"10 أسابيع", goal:"UX Basics، Design Thinking، Components، Design Systems"},
          {title:"Advanced Level", duration:"11 أسبوع", goal:"User Research كامل، Personas، Prototyping، الاختبار وCase Study"}
        ],
        challenge:[
          {name:"Daily UI Challenge", url:"https://www.dailyui.co/"},
          {name:"Dribbble", url:"https://dribbble.com/"},
          {name:"UX Challenge", url:"https://uxchallenge.co/"}
        ]
      },
      courses:[
        { id:"uiux-figma-fundamentals", title:"كورس أساسي: UI Design و Figma من الصفر (21 حلقة)", duration:"—", lessons:[
          {id:"uiux-figma-01", title:"مقدمة كورس تعلم Figma من الصفر للاحتراف 2026", duration:"5:50", type:"فيديو", videoUrl:"https://www.youtube.com/embed/XD_IEIbbF4Q"},
          {id:"uiux-figma-02", title:"كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الأولى المقدمة", duration:"9:32", type:"فيديو", videoUrl:"https://www.youtube.com/embed/MJDPFYe_0g0"},
          {id:"uiux-figma-03", title:"كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الثانيه هل المجال مهم وليه مستقبل؟", duration:"4:02", type:"فيديو", videoUrl:"https://www.youtube.com/embed/qSOAlU6112o"},
          {id:"uiux-figma-04", title:"كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الثالثه ايه الجهاز الي محتاجه؟", duration:"5:03", type:"فيديو", videoUrl:"https://www.youtube.com/embed/YQ8kgnIVLMw"},
          {id:"uiux-figma-05", title:"كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الرابعه كل حاجه محتاج تعرفها عن الالوان Color", duration:"27:06", type:"فيديو", videoUrl:"https://www.youtube.com/embed/1SfKlnZxdNw"},
          {id:"uiux-figma-06", title:"كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الخامسة كل حاجه محتاج تعرفها عن النصوص Typography", duration:"21:19", type:"فيديو", videoUrl:"https://www.youtube.com/embed/IgcyqReaUb8"},
          {id:"uiux-figma-07", title:"كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة السادسة كل حاجه  عن المسافات UI Spacing", duration:"38:36", type:"فيديو", videoUrl:"https://www.youtube.com/embed/kr7ExgMWmAY"},
          {id:"uiux-figma-08", title:"كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة السابعة كل حاجه عن الـ UI Layout الجزء الاول", duration:"19:55", type:"فيديو", videoUrl:"https://www.youtube.com/embed/gJ5SHjWMTyE"},
          {id:"uiux-figma-09", title:"كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة السابعة كل حاجه عن الـ UI Layout الجزء الثاني", duration:"8:16", type:"فيديو", videoUrl:"https://www.youtube.com/embed/nHRcr2NivzU"},
          {id:"uiux-figma-10", title:"كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة السابعة كل حاجه عن الـ UI Layout الجزء الثالث", duration:"7:42", type:"فيديو", videoUrl:"https://www.youtube.com/embed/rxOvJsjuGIA"},
          {id:"uiux-figma-11", title:"كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الثامنة كل حاجه عن الـ Wireframes وامتي تستخدمه!", duration:"13:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/4eh8iMcjgXs"},
          {id:"uiux-figma-12", title:"الحلقة الأولى من  كورس تعلم Figma من الصفر للاحتراف", duration:"5:00", type:"فيديو", videoUrl:"https://www.youtube.com/embed/vpCqCd0n9kc"},
          {id:"uiux-figma-13", title:"الحلقة الثانية من  كورس تعلم Figma من الصفر للاحتراف 2026 | تعلم واجهة فيجما الجزء الاول", duration:"16:08", type:"فيديو", videoUrl:"https://www.youtube.com/embed/i8mBt_883y8"},
          {id:"uiux-figma-14", title:"الحلقة الثالثة من  كورس تعلم Figma من الصفر للاحتراف 2026 | تعلم واجهة فيجما الجزء الثاني", duration:"42:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/JOUcTCl4Ad4"},
          {id:"uiux-figma-15", title:"الحلقة الرابعة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام النصوص Typography باحترافيه", duration:"28:42", type:"فيديو", videoUrl:"https://www.youtube.com/embed/p_i-mUsb8nk"},
          {id:"uiux-figma-16", title:"الحلقة الخامسة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام الالوان Colors باحترافيه", duration:"16:20", type:"فيديو", videoUrl:"https://www.youtube.com/embed/XCiFT9gEmoo"},
          {id:"uiux-figma-17", title:"الحلقة السادسة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام التآثيرات Effects  باحترافيه", duration:"17:52", type:"فيديو", videoUrl:"https://www.youtube.com/embed/swo9bRDPLb8"},
          {id:"uiux-figma-18", title:"الحلقة السابعة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام Sections لتسليم المبرمج الشغل", duration:"8:08", type:"فيديو", videoUrl:"https://www.youtube.com/embed/qkgI9XtfSdU"},
          {id:"uiux-figma-19", title:"الحلقة الثامنه من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام Groups وايه مميزاته", duration:"4:15", type:"فيديو", videoUrl:"https://www.youtube.com/embed/aQtJAtNy1DU"},
          {id:"uiux-figma-20", title:"الحلقة التاسعة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  بدايه استخدام ال Auto Layout", duration:"28:29", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Tcm9-lPP8Fo"},
          {id:"uiux-figma-21", title:"الحلقة العاشرة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام ال Auto Layout الجزء الثاني", duration:"37:42", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Y9rgIyJlBDc"}
        ]},
        { id:"uiux-l1-w01", title:"Level 1: Beginner - الأسبوع 1: What is UI/UX, and what is the difference between UI & UX & Product Design?", duration:"أسبوع", lessons:[
          {id:"uiux-l1-w01-r1", title:"What is UI/UX, and what is the difference between UI & UX & Product Design? — فيديو 1", duration:"", type:"فيديو", videoUrl:"https://youtu.be/Nje7GiGeKW0?si=y4-xJl9wg114HdWR"},
          {id:"uiux-l1-w01-r2", title:"What is UI/UX, and what is the difference between UI & UX & Product Design? — فيديو 2", duration:"", type:"فيديو", videoUrl:"https://youtu.be/9xxkKl_8XjM?si=7DTn5i5Ws2YMSLh2"},
          {id:"uiux-l1-w01-extra", title:"موارد إضافية لهذا الأسبوع: What is UI/UX, and what is the difference between UI & UX & Product Design? — مصدر إضافي", duration:"", type:"قراءة", videoUrl:"https://www.interaction-design.org/literature/article/ux-vs-ui-what-s-the-difference"},
          {id:"uiux-l1-w01-task", title:"مهمة الأسبوع: 1. Summarize what you learned.", duration:"", type:"مشروع", videoUrl:"https://youtu.be/Nje7GiGeKW0?si=y4-xJl9wg114HdWR"}
        ]},
        { id:"uiux-l1-w02", title:"Level 1: Beginner - الأسبوع 2: Intro to UX Design", duration:"أسبوع", lessons:[
          {id:"uiux-l1-w02-r1", title:"Intro to UX Design — فيديو 1", duration:"", type:"قراءة", videoUrl:"https://maharatech.gov.eg/mod/hvp/view.php?id=9511"},
          {id:"uiux-l1-w02-task", title:"مهمة الأسبوع: Summarize the course & get the certificate", duration:"", type:"مشروع", videoUrl:"https://maharatech.gov.eg/mod/hvp/view.php?id=9511"}
        ]},
        { id:"uiux-l1-w03", title:"Level 1: Beginner - الأسبوع 3: Visual Design Principles", duration:"أسبوع", lessons:[
          {id:"uiux-l1-w03-r1", title:"Visual Design Principles — فيديو 1", duration:"", type:"فيديو", videoUrl:"https://youtu.be/9EPTM91TBDU?si=hm6WvAuDei_RfQHA"},
          {id:"uiux-l1-w03-r2", title:"Visual Design Principles — فيديو 2", duration:"", type:"فيديو", videoUrl:"https://youtu.be/Tj5WzZW8KJM?si=nLfPDi0cVXSh-ABi"},
          {id:"uiux-l1-w03-extra", title:"موارد إضافية لهذا الأسبوع: Visual Design Principles — مصدر إضافي، Visual Design Principles — مصدر إضافي", duration:"", type:"قراءة", videoUrl:"https://www.toptal.com/designers/ui/principles-of-design"},
          {id:"uiux-l1-w03-task", title:"مهمة الأسبوع: 1. Summarize what you learned.", duration:"", type:"مشروع", videoUrl:"https://youtu.be/9EPTM91TBDU?si=hm6WvAuDei_RfQHA"}
        ]},
        { id:"uiux-l1-w04", title:"Level 1: Beginner - الأسبوع 4: Figma Interface", duration:"أسبوع", lessons:[
          {id:"uiux-l1-w04-task", title:"مهمة الأسبوع: Design the task in the video", duration:"", type:"مشروع", videoUrl:"https://youtu.be/Ym7HCe5cQP8?si=NURguYLa1Ro2dnUP"}
        ]},
        { id:"uiux-l1-w05", title:"Level 1: Beginner - الأسبوع 5: UI Principles (p1)", duration:"أسبوع", lessons:[
          {id:"uiux-l1-w05-r1", title:"UI Principles (p1) — فيديو 1", duration:"", type:"فيديو", videoUrl:"https://youtu.be/IgcyqReaUb8?si=tSFKTxcs6OY6uGmu"},
          {id:"uiux-l1-w05-r2", title:"UI Principles (p1) — فيديو 2", duration:"", type:"فيديو", videoUrl:"https://youtu.be/GCluIaNmOG0?si=XVHhKXUyJ7fxnYQI"},
          {id:"uiux-l1-w05-extra", title:"موارد إضافية لهذا الأسبوع: UI Principles (p1) — مصدر إضافي، UI Principles (p1) — مصدر إضافي، UI Principles (p1) — مصدر إضافي، UI Principles (p1) — مصدر إضافي", duration:"", type:"قراءة", videoUrl:"https://youtu.be/1SfKlnZxdNw?si=jhvpL0EfCOE1GzfI"}
        ]},
        { id:"uiux-l1-w06", title:"Level 1: Beginner - الأسبوع 6: UI Principles (p2)", duration:"أسبوع", lessons:[
          {id:"uiux-l1-w06-r1", title:"UI Principles (p2) — فيديو 1", duration:"", type:"فيديو", videoUrl:"https://youtu.be/kr7ExgMWmAY?si=sf1E7H90njE3KFq1"},
          {id:"uiux-l1-w06-r2", title:"UI Principles (p2) — فيديو 2", duration:"", type:"فيديو", videoUrl:"https://youtu.be/cf95Z7Ngg8k?si=hRhTW9UOwSJV6YxI"},
          {id:"uiux-l1-w06-extra", title:"موارد إضافية لهذا الأسبوع: UI Principles (p2) — مصدر إضافي، UI Principles (p2) — مصدر إضافي، UI Principles (p2) — مصدر إضافي، UI Principles (p2) — مصدر إضافي", duration:"", type:"قراءة", videoUrl:"https://youtu.be/gJ5SHjWMTyE?si=l9bW-C93qB9rLB8n"},
          {id:"uiux-l1-w06-task", title:"مهمة الأسبوع: Copy the design:", duration:"", type:"مشروع", videoUrl:"https://cdn.dribbble.com/userupload/45637093/file/3bf31d7cb7c33d65f93a00fdf2968fed.png?resize=1504x1128&vertical=center"}
        ]},
        { id:"uiux-l1-w07", title:"Level 1: Beginner - الأسبوع 7: Auto Layout", duration:"أسبوع", lessons:[
          {id:"uiux-l1-w07-r1", title:"Auto Layout — فيديو 1", duration:"", type:"فيديو", videoUrl:"https://youtu.be/Tcm9-lPP8Fo?si=1sw81dII7Us4YylN"},
          {id:"uiux-l1-w07-r2", title:"Auto Layout — فيديو 2", duration:"", type:"فيديو", videoUrl:"https://youtu.be/Y1CHg3KVQoc?si=kDUoYbUqRY08yLGz"},
          {id:"uiux-l1-w07-task", title:"مهمة الأسبوع: Copy the design:", duration:"", type:"مشروع", videoUrl:"https://www.behance.net/gallery/245941343/Social-User-Profile-Management-Settings-UI-/modules/1421156267"}
        ]},
        { id:"uiux-l1-w08", title:"Level 1: Beginner - الأسبوع 8: Wireframe", duration:"أسبوع", lessons:[
          {id:"uiux-l1-w08-r1", title:"Wireframe — فيديو 1", duration:"", type:"فيديو", videoUrl:"https://youtu.be/4eh8iMcjgXs?si=ugQcuvIdZ9eCaTAi"},
          {id:"uiux-l1-w08-r2", title:"Wireframe — فيديو 2", duration:"", type:"فيديو", videoUrl:"https://youtu.be/qpH7-KFWZRI?si=3lHsFmcpdii8n_C2"},
          {id:"uiux-l1-w08-extra", title:"موارد إضافية لهذا الأسبوع: Wireframe — مصدر إضافي", duration:"", type:"قراءة", videoUrl:"https://www.toools.design/best-ux-design-and-prototype-tools#wireframing-tools"},
          {id:"uiux-l1-w08-task", title:"مهمة الأسبوع: Login & Sign up (Low-fidelity screens)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/4eh8iMcjgXs?si=ugQcuvIdZ9eCaTAi"}
        ]},
        { id:"uiux-l1-w09", title:"Level 1: Beginner - الأسبوع 9: Final Project & Competition", duration:"أسبوع", lessons:[
          {id:"uiux-l1-w09-r1", title:"Final Project & Competition — فيديو 1", duration:"", type:"قراءة", videoUrl:"https://drive.google.com/drive/folders/1ENSIbbb58iNyYDJHRBhpq-H0stSY-Gsm?usp=sharing"}
        ]},
        { id:"uiux-l2-w10", title:"Level 2: Intermediate - الأسبوع 10: UX Basics", duration:"أسبوع", lessons:[
          {id:"uiux-l2-w10-r1", title:"UX Basics — فيديو 1", duration:"", type:"قراءة", videoUrl:"https://www.edraak.org/en/programs/specialization/uiux-v1/"},
          {id:"uiux-l2-w10-task", title:"مهمة الأسبوع: 1. Summarize what you learned. 2. Course Certificate", duration:"", type:"مشروع", videoUrl:"https://www.edraak.org/en/programs/specialization/uiux-v1/"}
        ]},
        { id:"uiux-l2-w11", title:"Level 2: Intermediate - الأسبوع 11: Design Thinking", duration:"أسبوع", lessons:[
          {id:"uiux-l2-w11-r1", title:"Design Thinking — فيديو 1", duration:"", type:"فيديو", videoUrl:"https://youtu.be/n8V5yV2VEtU?si=7H9I0EqsTW9sB64w"},
          {id:"uiux-l2-w11-r2", title:"Design Thinking — فيديو 2", duration:"", type:"فيديو", videoUrl:"https://youtu.be/p_IKACdmH10?si=dlceVdo1YrT0Ji3u"},
          {id:"uiux-l2-w11-extra", title:"موارد إضافية لهذا الأسبوع: Design Thinking — مصدر إضافي، Design Thinking — مصدر إضافي", duration:"", type:"قراءة", videoUrl:"https://www.nngroup.com/articles/design-thinking/"},
          {id:"uiux-l2-w11-task", title:"مهمة الأسبوع: 1. Choose a problem you face in your daily life or in an app you use, and apply the **Design Thinking process** to it.", duration:"", type:"مشروع", videoUrl:"https://drive.google.com/drive/folders/1SHozBcnm3hZWPzgZSLYB6NVewxPtYNXR?usp=sharing"}
        ]},
        { id:"uiux-l2-w12", title:"Level 2: Intermediate - الأسبوع 12: Components & Variants", duration:"أسبوع", lessons:[
          {id:"uiux-l2-w12-r1", title:"Components & Variants — فيديو 1", duration:"", type:"فيديو", videoUrl:"https://youtu.be/bMStMrZMLBc?si=VCh501BTA1Z5eW3-"},
          {id:"uiux-l2-w12-r2", title:"Components & Variants — فيديو 2", duration:"", type:"فيديو", videoUrl:"https://youtu.be/BGNacvycbiI?si=fUpE5m_A7XQHgsxY"},
          {id:"uiux-l2-w12-extra", title:"موارد إضافية لهذا الأسبوع: Components & Variants — مصدر إضافي", duration:"", type:"قراءة", videoUrl:"https://youtu.be/gDbNZ8s-yrA?si=8ND7qjOVPuNrvVDP"},
          {id:"uiux-l2-w12-task", title:"مهمة الأسبوع: Design a Home Page for a simple app (for example: shopping, food delivery, or notes app) and make sure to apply these requirements 👇 1. Cards • Create a Card Component that includes: ◦ A product image (use Instant Swap to change images). ◦ Product name and price. ◦ A Button Component placed inside the card. • The Button Component should have 2 Variants: ◦ Active ◦ Pressed 2. Navigation Bar • Create a Nav Bar Component that contains icons or tabs (e.g. Home, Profile, Cart). • Use Instant Swap between navigation states. (active - disabled)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/bMStMrZMLBc?si=VCh501BTA1Z5eW3-"}
        ]},
        { id:"uiux-l2-w13", title:"Level 2: Intermediate - الأسبوع 13: Styles", duration:"أسبوع", lessons:[
          {id:"uiux-l2-w13-r1", title:"Styles — فيديو 1", duration:"", type:"فيديو", videoUrl:"https://youtu.be/P5y_QuPb9g4?si=pARd-aljQ2DBGd7T"},
          {id:"uiux-l2-w13-r2", title:"Styles — فيديو 2", duration:"", type:"فيديو", videoUrl:"https://youtu.be/DSNE3FPGmac?si=tLCzB6E6JfyKDLLw"},
          {id:"uiux-l2-w13-extra", title:"موارد إضافية لهذا الأسبوع: Styles — مصدر إضافي، Styles — مصدر إضافي", duration:"", type:"قراءة", videoUrl:"https://youtu.be/78Yiblp1Ib4?si=tFl_iUBQUiB-cs4c"},
          {id:"uiux-l2-w13-task", title:"مهمة الأسبوع: 1. Summarize what you read.", duration:"", type:"مشروع", videoUrl:"https://www.figma.com/design/ZLJwFg2Jg0SUJchKXDPQ6t/Task?node-id=0-1&t=E77nXsxYiJxtwBkp-1"}
        ]},
        { id:"uiux-l2-w14", title:"Level 2: Intermediate - الأسبوع 14: Design System p1", duration:"أسبوع", lessons:[
          {id:"uiux-l2-w14-r1", title:"Design System p1 — فيديو 1", duration:"", type:"فيديو", videoUrl:"https://youtu.be/_SK2L3Nns_s?si=u3Awmd5OcA35XwV1"},
          {id:"uiux-l2-w14-r2", title:"Design System p1 — فيديو 2", duration:"", type:"فيديو", videoUrl:"https://youtu.be/4STqQw-gMtE?si=V5a9DAtNdfJTLa9f"},
          {id:"uiux-l2-w14-task", title:"مهمة الأسبوع: 1. Create text field components", duration:"", type:"مشروع", videoUrl:"https://drive.google.com/drive/folders/1SHozBcnm3hZWPzgZSLYB6NVewxPtYNXR?usp=sharing"}
        ]},
        { id:"uiux-l2-w15", title:"Level 2: Intermediate - الأسبوع 15: Design System p2", duration:"أسبوع", lessons:[
          {id:"uiux-l2-w15-r1", title:"Buttons", duration:"", type:"فيديو", videoUrl:"https://youtu.be/gvDOui1V5l4?si=oI-OKSOb5AoGZHr1"},
          {id:"uiux-l2-w15-r2", title:"Dropdowns", duration:"", type:"فيديو", videoUrl:"https://youtu.be/MXnzu6RtHJU?si=yjoflCgQaHtW4d3-"},
          {id:"uiux-l2-w15-task", title:"مهمة الأسبوع: 1. Create buttons & dropdown components", duration:"", type:"مشروع", videoUrl:"https://drive.google.com/drive/folders/1SHozBcnm3hZWPzgZSLYB6NVewxPtYNXR?usp=sharing"}
        ]},
        { id:"uiux-l2-w16", title:"Level 2: Intermediate - الأسبوع 16: Design System p3", duration:"أسبوع", lessons:[
          {id:"uiux-l2-w16-r1", title:"Checkboxes & Radio Buttons", duration:"", type:"فيديو", videoUrl:"https://youtu.be/vfCAFDtENVE?si=b1nOsCoHx5vLdm2W"},
          {id:"uiux-l2-w16-r2", title:"Pattern Library", duration:"", type:"فيديو", videoUrl:"https://youtu.be/qu53GgSgOak?si=i5tMGpkaSmsEG5dW"},
          {id:"uiux-l2-w16-task", title:"مهمة الأسبوع: 1. Design Login & Sign up screens for mobile app & desktop using design system Resources:", duration:"", type:"مشروع", videoUrl:"https://drive.google.com/drive/folders/1SHozBcnm3hZWPzgZSLYB6NVewxPtYNXR?usp=sharing"}
        ]},
        { id:"uiux-l2-w17", title:"Level 2: Intermediate - الأسبوع 17: Grids", duration:"أسبوع", lessons:[
          {id:"uiux-l2-w17-r1", title:"Grids", duration:"", type:"فيديو", videoUrl:"https://youtu.be/xUfiMPTz2mI?si=YALdlkiK35hdSiU2"},
          {id:"uiux-l2-w17-task", title:"مهمة الأسبوع: راجع رابط المهمة المرفق", duration:"", type:"مشروع", videoUrl:"https://drive.google.com/drive/folders/1SHozBcnm3hZWPzgZSLYB6NVewxPtYNXR?usp=sharing"}
        ]},
        { id:"uiux-l2-w18", title:"Level 2: Intermediate - الأسبوع 18: Responsive Design", duration:"أسبوع", lessons:[
          {id:"uiux-l2-w18-r1", title:"Responsive Design — فيديو 1", duration:"", type:"فيديو", videoUrl:"https://youtu.be/g1LDcbIcqgQ?si=4hE4Es-R-r-BhsQ_"},
          {id:"uiux-l2-w18-r2", title:"Responsive Design — فيديو 2", duration:"", type:"فيديو", videoUrl:"https://youtu.be/gsVWwYC9gXI?si=eMiNKXpauJf76yHN"},
          {id:"uiux-l2-w18-task", title:"مهمة الأسبوع: راجع رابط المهمة المرفق", duration:"", type:"مشروع", videoUrl:"https://youtu.be/Jz51jYRB_kE?si=cGDJjskeMEGbErXI"}
        ]},
        { id:"uiux-l2-w19", title:"Level 2: Intermediate - الأسبوع 19: Variables", duration:"أسبوع", lessons:[
          {id:"uiux-l2-w19-r1", title:"Playlist (Arabic)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLk31GonFeFpuGaYgN2uiwa4SpMEitr-ft&si=eD7S-m9mynO_sQWG"},
          {id:"uiux-l2-w19-r2", title:"Variables — فيديو 2 (English)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/fn4rP20U2UM?si=08EO2v-L7TtB0_dh"},
          {id:"uiux-l2-w19-extra", title:"موارد إضافية لهذا الأسبوع: How to Use Variables in Figma – A Handbook for Beginners، Design Tokens 101: How to Use Figma Variables in Real Projects | by Nathan | Apr, 2026 | Muzli - Design Inspiration", duration:"", type:"قراءة", videoUrl:"https://www.freecodecamp.org/news/variables-in-figma-handbook"},
          {id:"uiux-l2-w19-task", title:"مهمة الأسبوع: Create an E-commerce Home Page that supports: - Light / Dark themes - English / Arabic layout - Variables for colors, spacing, and typography", duration:"", type:"مشروع", videoUrl:"https://youtube.com/playlist?list=PLk31GonFeFpuGaYgN2uiwa4SpMEitr-ft&si=eD7S-m9mynO_sQWG"}
        ]},
        { id:"uiux-l3-w21", title:"Level 3: Advanced - الأسبوع 21: UX Research → (Emphasis)", duration:"أسبوع", lessons:[
          {id:"uiux-l3-w21-r1", title:"UX Research → (Emphasis) — فيديو 1 (Arabic)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/z3ruzLItPlM?si=Q5Hv9qyn12EwcQUc"},
          {id:"uiux-l3-w21-r2", title:"UX Research → (Emphasis) — فيديو 2 (English)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/Lg2rXgxUoGE?si=oY_Ju1fwXlbG_h5a"},
          {id:"uiux-l3-w21-extra", title:"موارد إضافية لهذا الأسبوع: UX Research → (Emphasis) — مصدر إضافي، UX Research → (Emphasis) — مصدر إضافي، What is User Research? — updated 2025 | IxDF، UX design research methods | Figma، Quantitative vs. qualitative research", duration:"", type:"قراءة", videoUrl:"https://youtu.be/zGCRhd3r4fE?si=2Ew6DZ2xaRaH6xbc"},
          {id:"uiux-l3-w21-task", title:"مهمة الأسبوع: Summarize what you learned", duration:"", type:"مشروع", videoUrl:"https://youtu.be/z3ruzLItPlM?si=Q5Hv9qyn12EwcQUc"}
        ]},
        { id:"uiux-l3-w22", title:"Level 3: Advanced - الأسبوع 22: Surveys & Interviews → (Emphasis)", duration:"أسبوع", lessons:[
          {id:"uiux-l3-w22-r1", title:"Surveys & Interviews → (Emphasis) — فيديو 1 (Arabic)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/1I80heBlPN4?si=feo-dF_C21TIVXm_"},
          {id:"uiux-l3-w22-r2", title:"Surveys & Interviews → (Emphasis) — فيديو 2 (English)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/5tVbFfGDQCk?si=_yNa6zYLvBj7WX01"},
          {id:"uiux-l3-w22-extra", title:"موارد إضافية لهذا الأسبوع: Surveys & Interviews → (Emphasis) — مصدر إضافي، Surveys & Interviews → (Emphasis) — مصدر إضافي، User Interviews for UX Research: What, Why & How، Surveys for UX Research", duration:"", type:"قراءة", videoUrl:"https://youtu.be/MuyJOQFwwlw?si=Xc7wExzxhfuA2lM3"},
          {id:"uiux-l3-w22-task", title:"مهمة الأسبوع: Apply to your project user interviews & survey analytics", duration:"", type:"مشروع", videoUrl:"https://youtu.be/1I80heBlPN4?si=feo-dF_C21TIVXm_"}
        ]},
        { id:"uiux-l3-w23", title:"Level 3: Advanced - الأسبوع 23: Competitive & SWOT Analysis → (Emphasis)", duration:"أسبوع", lessons:[
          {id:"uiux-l3-w23-r1", title:"Competitive & SWOT Analysis → (Emphasis) — فيديو 1 (Arabic)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/JyLiEl3px28?si=Yb1Sh1xz9agRKVVe"},
          {id:"uiux-l3-w23-r2", title:"Competitive & SWOT Analysis → (Emphasis) — فيديو 2 (English)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/uC1k3KnW9Ik?si=52nF5hwsgRJseIS3"},
          {id:"uiux-l3-w23-extra", title:"موارد إضافية لهذا الأسبوع: Competitive & SWOT Analysis → (Emphasis) — مصدر إضافي، Competitive & SWOT Analysis → (Emphasis) — مصدر إضافي، Competitive & SWOT Analysis → (Emphasis) — مصدر إضافي، Competitive & SWOT Analysis → (Emphasis) — مصدر إضافي، Competitive Analysis for UX – Top 6 Research Methods | UXPin، Top Things to Know About UX Competitive Analysis | by uxplanet.org | UX Planet", duration:"", type:"قراءة", videoUrl:"https://youtu.be/xaIeoPtHnuY?si=bjmUfOD-FqnfoPxA"},
          {id:"uiux-l3-w23-task", title:"مهمة الأسبوع: Choose **3–4 competitors** for your project topic and create a **Competitive Analysis + SWOT Analysis**", duration:"", type:"مشروع", videoUrl:"https://youtu.be/JyLiEl3px28?si=Yb1Sh1xz9agRKVVe"}
        ]},
        { id:"uiux-l3-w24", title:"Level 3: Advanced - الأسبوع 24: Problem Statement → (Define)", duration:"أسبوع", lessons:[
          {id:"uiux-l3-w24-r1", title:"Problem Statement → (Define) — فيديو 1 (English)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/SLwQxKvzfz8?si=UZoP4lEXZE6KPowU"},
          {id:"uiux-l3-w24-r2", title:"UX problem statement examples and tips to master it (Guide)", duration:"", type:"قراءة", videoUrl:"https://www.eleken.co/blog-posts/ux-problem-statement-examples"},
          {id:"uiux-l3-w24-extra", title:"موارد إضافية لهذا الأسبوع: Problem Statement → (Define) — مصدر إضافي، Problem Statements in UX Discovery - NN/G", duration:"", type:"قراءة", videoUrl:"https://youtu.be/kT0ZqwdPYRM?si=3PN40j2dtKUIMZ9O"},
          {id:"uiux-l3-w24-task", title:"مهمة الأسبوع: Apply to your project **Problem Statement**", duration:"", type:"مشروع", videoUrl:"https://youtu.be/SLwQxKvzfz8?si=UZoP4lEXZE6KPowU"}
        ]},
        { id:"uiux-l3-w25", title:"Level 3: Advanced - الأسبوع 25: Persona & Empathy Map → (Define)", duration:"أسبوع", lessons:[
          {id:"uiux-l3-w25-r1", title:"Persona & Empathy Map → (Define) — فيديو 1 (Arabic)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/0gJR-Jb99U4?si=u-FrzK__FIkvU66M"},
          {id:"uiux-l3-w25-r2", title:"Persona & Empathy Map → (Define) — فيديو 2 (English)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/u44pBnAn7cM?si=Ozci7QZeqFO1mzjB"},
          {id:"uiux-l3-w25-extra", title:"موارد إضافية لهذا الأسبوع: Persona & Empathy Map → (Define) — مصدر إضافي، Persona & Empathy Map → (Define) — مصدر إضافي، User Persona and Empathy Map: Key Differences & Importance، Creating Personas. A guide, not a template | by Ben Le Ralph | Medium، Empathy Map – Why and How to Use It | IxDF", duration:"", type:"قراءة", videoUrl:"https://youtu.be/QwF9a56WFWA?si=YHn--rvmGDPMRohr"},
          {id:"uiux-l3-w25-task", title:"مهمة الأسبوع: Apply to your project **Persona & Empathy map**", duration:"", type:"مشروع", videoUrl:"https://youtu.be/0gJR-Jb99U4?si=u-FrzK__FIkvU66M"}
        ]},
        { id:"uiux-l3-w26", title:"Level 3: Advanced - الأسبوع 26: Journey Map → (Define)", duration:"أسبوع", lessons:[
          {id:"uiux-l3-w26-r1", title:"Journey Map → (Define) — فيديو 1 (Arabic)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/tlOClosfiPc?si=X9tUetE0AO2lZ1bT"},
          {id:"uiux-l3-w26-r2", title:"Journey Map → (Define) — فيديو 2 (English)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/3iwL2OEeWiw?si=EksYfam21yN50-Q1"},
          {id:"uiux-l3-w26-extra", title:"موارد إضافية لهذا الأسبوع: What is a Customer Journey Map? Tips & Examples | Miro، Customer Journey Map: Definition & Process | IxDF، How to create a customer journey map: a practical guide with real examples", duration:"", type:"قراءة", videoUrl:"https://miro.com/customer-journey-map/what-is-a-customer-journey-map/"},
          {id:"uiux-l3-w26-task", title:"مهمة الأسبوع: Apply to your project **Journey Map**", duration:"", type:"مشروع", videoUrl:"https://youtu.be/tlOClosfiPc?si=X9tUetE0AO2lZ1bT"}
        ]},
        { id:"uiux-l3-w27", title:"Level 3: Advanced - الأسبوع 27: Brainstorming & Affinity Diagram → (Ideate)", duration:"أسبوع", lessons:[
          {id:"uiux-l3-w27-r1", title:"Brainstorming & Affinity Diagram → (Ideate) — فيديو 1 (Arabic)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/NvZ-Fz6eP7I?si=HSxGSW5q_HHeb4hv"},
          {id:"uiux-l3-w27-r2", title:"Brainstorming & Affinity Diagram → (Ideate) — فيديو 2 (English)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/uVz_oFK472w?si=_0O8_C37V5KTq07G"},
          {id:"uiux-l3-w27-extra", title:"موارد إضافية لهذا الأسبوع: Brainstorming & Affinity Diagram → (Ideate) — مصدر إضافي، Brainstorming & Affinity Diagram → (Ideate) — مصدر إضافي، What is Brainstorming? Techniques and Methods | Miro، What Is An Affinity Diagram And How Do You Use It? | MiroBlog", duration:"", type:"قراءة", videoUrl:"https://youtu.be/1hImtrUooe0?si=PY2JDDVi6tAMF5K0"}
        ]},
        { id:"uiux-l3-w28", title:"Level 3: Advanced - الأسبوع 28: Information Architecture & User Flow → (Ideate)", duration:"أسبوع", lessons:[
          {id:"uiux-l3-w28-r1", title:"Information Architecture & User Flow → (Ideate) — فيديو 1 (Arabic)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/2iCYjjgqVWY?si=iYMB9SGLMAzt1tLw"},
          {id:"uiux-l3-w28-r2", title:"Information Architecture & User Flow → (Ideate) — فيديو 2 (English)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/OJLfjgVlwDo?si=lXyZua8fGmJ7Q0LU"},
          {id:"uiux-l3-w28-extra", title:"موارد إضافية لهذا الأسبوع: Information Architecture & User Flow → (Ideate) — مصدر إضافي، Information Architecture & User Flow → (Ideate) — مصدر إضافي، What is Information Architecture in UX Design? - GeeksforGeeks، UX Information Architecture: Guide & Examples | Clay، What Is a User Flow? | Figma، [How to master the design of user flows [ complete guide]](", duration:"", type:"قراءة", videoUrl:"https://youtu.be/0_6z39YcMTo?si=aQba2cWl89VFtJd4"},
          {id:"uiux-l3-w28-task", title:"مهمة الأسبوع: Apply to your project **Information Architecture & User Flow**", duration:"", type:"مشروع", videoUrl:"https://youtu.be/2iCYjjgqVWY?si=iYMB9SGLMAzt1tLw"}
        ]},
        { id:"uiux-l3-w29", title:"Level 3: Advanced - الأسبوع 29: Prototype → (Design)", duration:"أسبوع", lessons:[
          {id:"uiux-l3-w29-r1", title:"Prototype → (Design) — فيديو 1 (Arabic)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/1hJjyL0o7vg?si=JqkIfqD7apHi7oKh"},
          {id:"uiux-l3-w29-r2", title:"Logo Animation", duration:"", type:"فيديو", videoUrl:"https://youtu.be/ZSDe8TMKgq0?si=C0qAGtuqjzMa4RTH"},
          {id:"uiux-l3-w29-extra", title:"موارد إضافية لهذا الأسبوع: Prototype → (Design) — مصدر إضافي، Text Animation، Onboarding Animation، Loading Animation، Navigation Bar Animation، **Swipe Card Animation**، Menu Animation", duration:"", type:"قراءة", videoUrl:"https://youtu.be/p8IUj994qP8?si=UItsKGHLqdMJJqqx"},
          {id:"uiux-l3-w29-task", title:"مهمة الأسبوع: Prototype your project", duration:"", type:"مشروع", videoUrl:"https://youtu.be/1hJjyL0o7vg?si=JqkIfqD7apHi7oKh"}
        ]},
        { id:"uiux-l3-w30", title:"Level 3: Advanced - الأسبوع 30: Test & Case Study → (Test)", duration:"أسبوع", lessons:[
          {id:"uiux-l3-w30-r1", title:"Test & Case Study → (Test) — فيديو 1 (Arabic)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/XisQC2JWhCA?si=CHSxkF7oSMKrUwn5"},
          {id:"uiux-l3-w30-r2", title:"Test & Case Study → (Test) — فيديو 2 (English)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/nYCJTea1AUQ?si=Mjabwl9CLdrN6MR9"},
          {id:"uiux-l3-w30-extra", title:"موارد إضافية لهذا الأسبوع: A Comprehensive Guide To User Testing — Smashing Magazine، Iterative Usability Testing - All You Need To Know | Adobe XD Ideas، Usability testing: the complete guide | by Andrew Tipp | UX Planet", duration:"", type:"قراءة", videoUrl:"https://www.smashingmagazine.com/2018/03/guide-user-testing/"},
          {id:"uiux-l3-w30-task", title:"مهمة الأسبوع: Make the usability testing & upload your case study on behance", duration:"", type:"مشروع", videoUrl:"https://youtu.be/XisQC2JWhCA?si=CHSxkF7oSMKrUwn5"}
        ]},
        { id:"uiux-l3-w31", title:"Level 3: Advanced - الأسبوع 31: Dashboard", duration:"أسبوع", lessons:[
          {id:"uiux-l3-w31-r1", title:"Dashboard — فيديو 1 (Arabic)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/9g-MzZ91k3I?si=jWLCLSJU_73XMVe-"},
          {id:"uiux-l3-w31-extra", title:"موارد إضافية لهذا الأسبوع: Dashboard — مصدر إضافي، Dashboard — مصدر إضافي", duration:"", type:"قراءة", videoUrl:"https://youtu.be/xZjRhIS0H0c?si=_dBjrym99jp0gXk1"},
          {id:"uiux-l3-w31-task", title:"مهمة الأسبوع: Design this dashboard", duration:"", type:"مشروع", videoUrl:"https://youtu.be/9g-MzZ91k3I?si=jWLCLSJU_73XMVe-"}
        ]},
      ]
    }]
  },

  { id:"photo", name:"مصور فوتوغرافي", cat:"إبداعي", icon:"📸", desc:"التقاط اللحظات وتحويلها إلى فن — مهنة تجمع الإبداع والتقنية.",
    longDesc:"المصور الفوتوغرافي بيلتقط لحظات حقيقية ويحولها لأعمال فنية تعيش. بيتخصص في مجالات زي تصوير الأعراس، أو المنتجات، أو الطبيعة، أو الأشخاص. بيستخدم كاميرا احترافية وAdobe Lightroom لتعديل الصور. مسار ممتاز لمن يريد مزج الفن بالعمل الحر.", difficulty:"سهل", time:"1-3 أشهر", match:78, salary:"500-3000$",
    tools:["Camera DSLR/Mirrorless","Adobe Lightroom","Photoshop","Instagram"],
    daily:["التصوير في مواقع مختلفة","تعديل وتحرير الصور","بناء portfolio على Instagram","التواصل مع العملاء"],
    roadmap:[{t:"أساسيات الكاميرا",d:"الثلاثية: فتحة العدسة، سرعة الغالق، ISO"},{t:"التأليف والإضاءة",d:"فن التقاط الصورة المثالية"},{t:"التعديل",d:"Lightroom لتحسين ألوانك"},{t:"Portfolio",d:"50 صورة احترافية على Instagram"},{t:"أول عميل",d:"صوّر حفلات أو بورتريه"}],
    course:"https://www.youtube.com/c/PeterMcKinnon", example:"مصور حفلات يكسب 300-1000$ لليلة الواحدة.",
    tracks:[{
      id:"photography-videography-track", title:"التصوير الفوتوغرافي والفيديوغرافي", subtitle:"من الصفر لاحتراف الكاميرا والموبايل",
      longDesc:"مسار CATRealoaded للتصوير الفوتوغرافي والفيديوغرافي بياخدك من التعرف على أنواع الكاميرات والعدسات، لأساسيات التصوير والفيديو بالكاميرا وبالموبايل، لحد قواعد التأليف البصري وأشهر الأخطاء اللي لازم تتجنبها، وينتهي بتعلم Lightroom لتحرير صورك بلمسة احترافية. المسار عملي ومباشر ومناسب سواء بتصور بكاميرا احترافية أو بموبايلك بس.",
      level:"مبتدئ", duration:"5 مراحل (مرن حسب وقتك)", totalLessons:14, icon:"📸", color:"#e8502a", coverImage:"assets/cat-design.svg",
      intro:{
        tools:[
          {name:"كاميرا (DSLR/Mirrorless) أو موبايل جيد", purpose:"أداة التصوير الأساسية", url:""},
          {name:"Tripod + Lighting Kit", purpose:"ثبات اللقطة وإضاءة احترافية", url:""},
          {name:"Adobe Lightroom", purpose:"تعديل الصور وتلوينها باحترافية", url:"https://www.adobe.com/products/photoshop-lightroom.html"}
        ],
        accounts:[
          {name:"Instagram", why:"بناء portfolio بصري وعرض شغلك", url:"https://www.instagram.com/"},
          {name:"YouTube", why:"متابعة قنوات تصوير احترافية والتعلم المستمر", url:"https://www.youtube.com/"}
        ],
        plan:[
          {title:"التعرف على المعدات", duration:"مرحلة 1", goal:"أنواع الكاميرات والعدسات والإكسسوارات الأساسية"},
          {title:"أساسيات التصوير الفوتوغرافي", duration:"مرحلة 2", goal:"إعدادات الكاميرا الأساسية والتصوير بالموبايل"},
          {title:"أساسيات الفيديوغرافي", duration:"مرحلة 3", goal:"تصوير الفيديو بالموبايل والكاميرا وأفضل الإعدادات"},
          {title:"فن الالتقاط", duration:"مرحلة 4", goal:"قواعد وتلميحات لأفضل اللقطات، والأخطاء الشائعة"},
          {title:"اللمسة السحرية", duration:"مرحلة 5", goal:"احتراف Lightroom لتعديل الصور (ديسكتوب وموبايل)"}
        ],
        challenge:[
          {name:"Instagram", url:"https://www.instagram.com/"},
          {name:"Behance", url:"https://www.behance.net/"}
        ]
      },
      courses:[
        { id:"pv-equipment", title:"مرحلة 1: التعرف على المعدات (Equipment Familiarization)", duration:"", lessons:[
          {id:"pv-eq-01", title:"إزاي تفرق بين أنواع الكاميرات الأساسية", duration:"", type:"فيديو", videoUrl:"https://youtu.be/wbBBKet0PFQ?si=QAY7jSi8iBq-ak8c"},
          {id:"pv-eq-02", title:"وسّع معرفتك بعدسات الكاميرا", duration:"", type:"فيديو", videoUrl:"https://youtu.be/c74B2OHIJKc?si=-g0PYzpH2jzK4CcU"},
          {id:"pv-eq-03", title:"إكسسوارات الكاميرا الأساسية (Tripod, Lighting Set)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/-SOBDagFhEk?si=TC8Aag8xpF3eqr0P"}
        ]},
        { id:"pv-photo-fundamentals", title:"مرحلة 2: أساسيات التصوير الفوتوغرافي", duration:"", lessons:[
          {id:"pv-ph-01", title:"كورس سريع لأهم أساسيات التصوير", duration:"", type:"فيديو", videoUrl:"https://youtu.be/V7z7BAZdt2M?si=6OAjdfOsoZLGS6EH"},
          {id:"pv-ph-02", title:"الأساسيات والإعدادات الرئيسية للكاميرا", duration:"", type:"فيديو", videoUrl:"https://youtu.be/ixRKeQMa7Nc?si=pgJOWOhWEdSKeiLn"},
          {id:"pv-ph-03", title:"أساسيات التصوير بالموبايل", duration:"", type:"فيديو", videoUrl:"https://youtu.be/FRLTOBBkm2I?si=5oMb7wBqteK8ZMpz"}
        ]},
        { id:"pv-video-fundamentals", title:"مرحلة 3: أساسيات الفيديوغرافي", duration:"", lessons:[
          {id:"pv-vi-01", title:"أساسيات تصوير الفيديو بالموبايل", duration:"", type:"فيديو", videoUrl:"https://youtu.be/0nG7pAXRgvE?si=hoWgXjVuUid4q0A2"},
          {id:"pv-vi-02", title:"أساسيات تصوير الفيديو بالكاميرا", duration:"", type:"فيديو", videoUrl:"https://youtu.be/kZWH6OBDdR0?si=nGiT2nY8SMxM2s9V"},
          {id:"pv-vi-03", title:"إزاي تصور فيديو بأفضل الإعدادات", duration:"", type:"فيديو", videoUrl:"https://youtu.be/eINSy5Aguzo?si=VZuKm6J-uwIvdt38"},
          {id:"pv-vi-04", title:"إزاي تظبط الكاميرا لتصوير الفيديوهات", duration:"", type:"فيديو", videoUrl:"https://youtu.be/rRSgCJGeKNo?si=uudfzyt_IgQIWd0o"}
        ]},
        { id:"pv-art-of-capturing", title:"مرحلة 4: فن الالتقاط", duration:"", lessons:[
          {id:"pv-art-01", title:"قواعد ونصايح لأفضل اللقطات", duration:"", type:"فيديو", videoUrl:"https://youtu.be/nKM3jkEOpuE?si=CiXquc0hwq9v86US"},
          {id:"pv-art-02", title:"أخطاء لازم تتجنبها", duration:"", type:"فيديو", videoUrl:"https://youtu.be/NAexy836ff8?si=5V-7EtnIgIkHWnaR"}
        ]},
        { id:"pv-magic-touch", title:"مرحلة 5: اللمسة السحرية (Lightroom)", duration:"", lessons:[
          {id:"pv-lr-01", title:"Lightroom صاحبك طول ما بتحب تصور (كورس سريع)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/VUCPznpejI8?si=LAcNnQlP9fslgZCz"},
          {id:"pv-lr-02", title:"احتراف Lightroom Mobile (بلاي ليست كاملة)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLW-zSkCnZ-gCDj0DhrC9DrsVtndLuntdj&si=ZJIqSPGGElrrC1nL"}
        ]}
      ]
    }] },

  { id:"video", name:"مونتاج فيديو", cat:"إبداعي", icon:"🎬", desc:"تحويل اللقطات الخام إلى محتوى مؤثر يشاهده الملايين.",
    longDesc:"المونتاجيست بيحول اللقطات الخام إلى قصة مؤثرة ومتماسكة. بيشتغل مع يوتيوبرز وشركات ووكالات إعلانية. بيستخدم برامج زي Adobe Premiere أو DaVinci Resolve. الطلب عليه ارتفع بشكل كبير مع انتشار المحتوى الرقمي وصناع المحتوى.", difficulty:"متوسط", time:"2-5 أشهر", match:75, salary:"800-4000$",
    tools:["Adobe Premiere","DaVinci Resolve","After Effects","CapCut"],
    daily:["مونتاج فيديوهات يوتيوب وريلز","إضافة موشن جرافيك","إدارة الألوان","التواصل مع المنشئين"],
    roadmap:[{t:"أساسيات المونتاج",d:"تعلم DaVinci Resolve مجاناً"},{t:"إيقاع وسرد",d:"كيف تروي قصة بالصورة"},{t:"موشن جرافيك",d:"After Effects أساسيات"},{t:"تخصص",d:"YouTube, Reels, Ads, Weddings"},{t:"عملاء",d:"منشئو محتوى يحتاجون محررين"}],
    course:"https://www.youtube.com/@FilmRiot", example:"محرر فيديو لمنشئ محتوى يكسب 500-2000$ شهرياً." },
     { id:"marketing", name:"تسويق رقمي", cat:"أعمال", icon:"📣", desc:"مساعدة الشركات على الوصول لعملائها عبر الإنترنت.",
    longDesc:"المسوق الرقمي بيساعد الشركات توصل لجمهورها المستهدف عبر الإنترنت بأقل تكلفة وأعلى عائد. بيدير إعلانات مدفوعة على Google وMeta، ويشتغل على SEO والمحتوى والإيميل. مهنة تفتح أبواب واسعة في وكالات التسويق أو الفريلانس أو بناء مشروعك الخاص.", difficulty:"سهل", time:"2-4 أشهر", match:84, salary:"800-3500$",
    tools:["Google Ads","Meta Ads","Google Analytics","Mailchimp","Canva"],
    daily:["إدارة حملات إعلانية","تحليل البيانات والنتائج","كتابة محتوى","إدارة وسائل التواصل"],
    roadmap:[{t:"أساسيات التسويق",d:"فهم جمهورك وكيف تصل إليه"},{t:"Google & Meta Ads",d:"الإعلانات المدفوعة"},{t:"SEO وكتابة المحتوى",d:"ظهور مجاني في نتائج البحث"},{t:"Email Marketing",d:"Mailchimp وتسويق البريد"},{t:"أول مشروع",d:"دير صفحة شركة صغيرة مجاناً"}],
    course:"https://learndigital.withgoogle.com/digitalgarage", example:"مسوق رقمي متوسط يكسب 1500-3000$ شهرياً.",
    tracks:[{
      id:"digital-marketing-track", title:"خبير التسويق الرقمي", subtitle:"من الإعلانات إلى الـ ROI",
      longDesc:"مسار التسويق الرقمي هيعلمك كيف توصّل أي منتج أو خدمة لأكبر عدد ممكن من الناس عبر الإنترنت. هتتعلم إدارة إعلانات Google وMeta، وتحسين محركات البحث SEO، وكتابة المحتوى المقنع، وتحليل نتائج الحملات بالأرقام. مسار مناسب للشخص اللي بيحب الإبداع مع التفكير الاستراتيجي، وبيفتح أبواب فريلانس ووظائف في أي صناعة.",
      level:"مبتدئ", duration:"6 أشهر", totalLessons:70, icon:"📣", color:"#0d8a5f", coverImage:"assets/cat-content.svg",
      intro:{
        tools:[
          {name:"Google Ads", purpose:"إعلانات البحث والشبكة الإعلانية", url:"https://ads.google.com/"},
          {name:"Meta Ads Manager", purpose:"إعلانات فيسبوك وإنستجرام", url:"https://www.facebook.com/business/tools/ads-manager"},
          {name:"Google Analytics", purpose:"تحليل سلوك الزوار", url:"https://analytics.google.com/"},
          {name:"Mailchimp", purpose:"إدارة حملات البريد الإلكتروني", url:"https://mailchimp.com/"},
          {name:"Canva", purpose:"تصميم سريع للمحتوى التسويقي", url:"https://www.canva.com/"}
        ],
        accounts:[
          {name:"Google Analytics", why:"تتبّع نتائج حملاتك", url:"https://analytics.google.com/"},
          {name:"Meta Business Suite", why:"إدارة صفحات وحملات فيسبوك", url:"https://business.facebook.com/"},
          {name:"HubSpot Academy", why:"شهادات تسويق مجانية معتمدة", url:"https://academy.hubspot.com/"}
        ],
        plan:[
          {title:"أساسيات التسويق الرقمي", duration:"3 أسابيع", goal:"فهم القنوات والجمهور المستهدف"},
          {title:"السوشيال ميديا والإعلانات المدفوعة", duration:"7 أسابيع", goal:"إدارة حملات حقيقية على Google وMeta"},
          {title:"SEO والمحتوى", duration:"6 أسابيع", goal:"ظهور مجاني وكتابة محتوى مقنع"},
          {title:"Email Marketing والتحسين", duration:"3 أسابيع", goal:"أتمتة الحملات وتحسين معدل التحويل"},
          {title:"المسار المهني", duration:"2 أسابيع", goal:"بورتفوليو وأول عميل فريلانس"}
        ],
        challenge:[
          {name:"Google Skillshop", url:"https://skillshop.withgoogle.com/"},
          {name:"HubSpot Academy", url:"https://academy.hubspot.com/"},
          {name:"Meta Blueprint", url:"https://www.facebook.com/business/learn"}
        ]
      },
      courses:[
        { id:"marketing-basics", title:"أساسيات التسويق الرقمي", duration:"2 أسابيع", lessons:[
          {id:"marketing-intro",title:"مقدمة إلى التسويق الرقمي",duration:"25 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"فيديو"},
          {id:"marketing-funnel",title:"قمع التسويق Marketing Funnel",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=rUfHlCjLgUA",type:"فيديو"},
          {id:"buyer-journey",title:"رحلة المشتري Buyer's Journey",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=8Ij7A1VEzbs",type:"فيديو"},
          {id:"target-audience",title:"تحديد الجمهور المستهدف",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=8Ij7A1VEzbs",type:"فيديو"},
          {id:"competitor-analysis",title:"تحليل المنافسين",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"تدريب"},
          {id:"content-strategy",title:"استراتيجية المحتوى",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=nU-IIXBWlS4",type:"تدريب"},
          {id:"brand-voice",title:"صوت العلامة التجارية",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=nU-IIXBWlS4",type:"فيديو"},
          {id:"marketing-project-1",title:"مشروع: خطة تسويق أولى",duration:"90 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"مشروع"}]},
        { id:"social-media-marketing", title:"إدارة السوشيال ميديا", duration:"3 أسابيع", lessons:[
          {id:"platform-overview",title:"نظرة على منصات السوشيال",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=4qHuP21Wr28",type:"فيديو"},
          {id:"instagram-marketing",title:"التسويق عبر Instagram",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vlp3Jz1rOXU",type:"فيديو"},
          {id:"tiktok-marketing",title:"التسويق عبر TikTok",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vlp3Jz1rOXU",type:"فيديو"},
          {id:"linkedin-marketing",title:"LinkedIn للأعمال B2B",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vlp3Jz1rOXU",type:"فيديو"},
          {id:"content-calendar",title:"تقويم المحتوى Content Calendar",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vlp3Jz1rOXU",type:"تدريب"},
          {id:"copywriting-basics",title:"أساسيات كتابة المحتوى",duration:"45 دقيقة",videoUrl:"https://www.youtube.com/watch?v=nU-IIXBWlS4",type:"فيديو"},
          {id:"social-analytics",title:"تحليل أداء السوشيال",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=r6HqbOUzKBU",type:"تدريب"},
          {id:"social-project",title:"مشروع: إدارة صفحة لشهر كامل",duration:"120 دقيقة",videoUrl:"https://www.youtube.com/watch?v=4qHuP21Wr28",type:"مشروع"}]},
        { id:"paid-ads", title:"الإعلانات المدفوعة", duration:"3 أسابيع", lessons:[
          {id:"ads-intro",title:"مقدمة إلى الإعلانات المدفوعة",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=JcFvmwm_CaE",type:"فيديو"},
          {id:"google-ads",title:"Google Ads من الصفر",duration:"50 دقيقة",videoUrl:"https://www.youtube.com/watch?v=JcFvmwm_CaE",type:"فيديو"},
          {id:"google-search-ads",title:"إعلانات البحث Search Ads",duration:"45 دقيقة",videoUrl:"https://www.youtube.com/watch?v=JcFvmwm_CaE",type:"فيديو"},
          {id:"meta-ads",title:"Meta Ads & Facebook",duration:"50 دقيقة",videoUrl:"https://www.youtube.com/watch?v=h25jJTX8KXY",type:"فيديو"},
          {id:"meta-targeting",title:"الاستهداف في Meta",duration:"45 دقيقة",videoUrl:"https://www.youtube.com/watch?v=h25jJTX8KXY",type:"فيديو"},
          {id:"campaign-setup",title:"إعداد حملة كاملة",duration:"60 دقيقة",videoUrl:"https://www.youtube.com/watch?v=h25jJTX8KXY",type:"تدريب"},
          {id:"ad-copywriting",title:"كتابة نصوص الإعلانات",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=nU-IIXBWlS4",type:"فيديو"},
          {id:"retargeting",title:"إعادة الاستهداف Retargeting",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=h25jJTX8KXY",type:"فيديو"},
          {id:"project-ads",title:"مشروع: حملة إعلانية حقيقية",duration:"90 دقيقة",videoUrl:"https://www.youtube.com/watch?v=JcFvmwm_CaE",type:"مشروع"}]},
        { id:"seo-analytics", title:"SEO وتحليل البيانات", duration:"3 أسابيع", lessons:[
          {id:"seo-basics",title:"أساسيات SEO",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=DvwS7cV9GmQ",type:"فيديو"},
          {id:"keyword-research",title:"البحث عن الكلمات المفتاحية",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=xsVTqzratPs",type:"فيديو"},
          {id:"on-page-seo",title:"On-Page SEO",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=DvwS7cV9GmQ",type:"تدريب"},
          {id:"off-page-seo",title:"Off-Page SEO والروابط",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=DvwS7cV9GmQ",type:"فيديو"},
          {id:"technical-seo",title:"Technical SEO الأساسيات",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=DvwS7cV9GmQ",type:"فيديو"},
          {id:"analytics",title:"Google Analytics",duration:"45 دقيقة",videoUrl:"https://www.youtube.com/watch?v=r6HqbOUzKBU",type:"تدريب"},
          {id:"search-console",title:"Google Search Console",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=xsVTqzratPs",type:"تدريب"},
          {id:"reporting",title:"التقارير وقياس النتائج",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=r6HqbOUzKBU",type:"تدريب"},
          {id:"seo-project",title:"مشروع: تحسين موقع لمحركات البحث",duration:"120 دقيقة",videoUrl:"https://www.youtube.com/watch?v=DvwS7cV9GmQ",type:"مشروع"}]},
        { id:"email-marketing", title:"Email Marketing والأتمتة", duration:"2 أسابيع", lessons:[
          {id:"email-basics",title:"أساسيات Email Marketing",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vOfyYt6i5MU",type:"فيديو"},
          {id:"list-building",title:"بناء قائمة المشتركين",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vOfyYt6i5MU",type:"فيديو"},
          {id:"email-design",title:"تصميم الإيميلات الاحترافية",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vOfyYt6i5MU",type:"فيديو"},
          {id:"mailchimp",title:"Mailchimp من الصفر",duration:"45 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vOfyYt6i5MU",type:"تدريب"},
          {id:"automation",title:"أتمتة حملات البريد",duration:"45 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vOfyYt6i5MU",type:"فيديو"},
          {id:"email-analytics",title:"قياس نجاح الحملات",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vOfyYt6i5MU",type:"تدريب"},
          {id:"email-project",title:"مشروع: حملة إيميل كاملة",duration:"90 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vOfyYt6i5MU",type:"مشروع"}]},
        { id:"marketing-career", title:"المسار المهني والفريلانس", duration:"2 أسابيع", lessons:[
          {id:"marketing-portfolio",title:"بناء محفظة أعمال التسويق",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=BwJjFzqZzj0",type:"فيديو"},
          {id:"agency-freelance",title:"وكالة أم فريلانس؟",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=7NEfkDLiG6U",type:"فيديو"},
          {id:"client-reporting",title:"إعداد تقارير العملاء",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=r6HqbOUzKBU",type:"فيديو"},
          {id:"ai-marketing",title:"أدوات AI في التسويق",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=r7U9vkGbXJI",type:"فيديو"},
          {id:"marketing-trends",title:"ترندات التسويق 2025",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"فيديو"},
          {id:"marketing-final",title:"مشروع التخرج: استراتيجية تسويق متكاملة",duration:"180 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"مشروع"}]},
        { id:"conversion-optimization", title:"تحسين معدل التحويل CRO", duration:"2 أسابيع", lessons:[
          {id:"cro-intro",title:"مقدمة إلى تحسين التحويل",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"فيديو"},
          {id:"landing-pages",title:"تصميم Landing Pages فعالة",duration:"45 دقيقة",videoUrl:"https://www.youtube.com/watch?v=rUfHlCjLgUA",type:"فيديو"},
          {id:"ab-testing",title:"اختبار A/B Testing",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"تدريب"},
          {id:"heatmaps",title:"خرائط الحرارة Heatmaps",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"فيديو"},
          {id:"cro-copywriting",title:"كتابة نصوص تبيع",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=nU-IIXBWlS4",type:"فيديو"},
          {id:"cro-project",title:"مشروع: تحسين صفحة هبوط حقيقية",duration:"90 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"مشروع"}]},
        { id:"content-marketing", title:"التسويق بالمحتوى", duration:"2 أسابيع", lessons:[
          {id:"cm-intro",title:"مقدمة إلى Content Marketing",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=nU-IIXBWlS4",type:"فيديو"},
          {id:"cm-blogging",title:"كتابة المقالات التي تُحوَّل",duration:"40 دقيقة",videoUrl:"https://www.youtube.com/watch?v=nU-IIXBWlS4",type:"فيديو"},
          {id:"cm-video-content",title:"المحتوى المرئي Video Content",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vlp3Jz1rOXU",type:"فيديو"},
          {id:"cm-podcast",title:"البودكاست والمحتوى الصوتي",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=nU-IIXBWlS4",type:"فيديو"},
          {id:"cm-repurposing",title:"إعادة توظيف المحتوى",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=nU-IIXBWlS4",type:"فيديو"},
          {id:"cm-distribution",title:"توزيع المحتوى وزيادة الانتشار",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=nU-IIXBWlS4",type:"تدريب"},
          {id:"cm-project",title:"مشروع: خطة محتوى شهرية",duration:"90 دقيقة",videoUrl:"https://www.youtube.com/watch?v=nU-IIXBWlS4",type:"مشروع"}]},
        { id:"influencer-partnerships", title:"التسويق بالمؤثرين والشراكات", duration:"1 أسبوع", lessons:[
          {id:"inf-intro",title:"عالم التسويق بالمؤثرين",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vlp3Jz1rOXU",type:"فيديو"},
          {id:"inf-finding",title:"كيف تجد المؤثرين المناسبين",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vlp3Jz1rOXU",type:"فيديو"},
          {id:"inf-negotiation",title:"التفاوض مع المؤثرين",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"فيديو"},
          {id:"inf-measuring",title:"قياس نتائج حملات المؤثرين",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=r6HqbOUzKBU",type:"فيديو"},
          {id:"inf-affiliate",title:"التسويق بالعمولة Affiliate",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"فيديو"},
          {id:"inf-ugc",title:"المحتوى من المستخدمين UGC",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vlp3Jz1rOXU",type:"فيديو"},
          {id:"inf-brand-collab",title:"التعاون مع العلامات التجارية",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"فيديو"},
          {id:"inf-micro",title:"المؤثرون الصغار Micro-Influencers",duration:"30 دقيقة",videoUrl:"https://www.youtube.com/watch?v=vlp3Jz1rOXU",type:"فيديو"},
          {id:"inf-roi",title:"حساب عائد الاستثمار ROI",duration:"35 دقيقة",videoUrl:"https://www.youtube.com/watch?v=r6HqbOUzKBU",type:"تدريب"},
          {id:"marketing-capstone",title:"مشروع التخرج الشامل: خطة تسويق 360°",duration:"180 دقيقة",videoUrl:"https://www.youtube.com/watch?v=bixR-KIJKYM",type:"مشروع"}]}
      ]
    }]
  },

  { id:"3d", name:"تصميم ثلاثي الأبعاد", cat:"إبداعي", icon:"🧊", desc:"إنشاء عوالم افتراضية وموديلات ثلاثية الأبعاد لألعاب، أفلام ومنتجات.", difficulty:"صعب", time:"6-12 شهر", match:70, salary:"1500-7000$",
    tools:["Blender","Cinema 4D","Maya","ZBrush","Unreal Engine"],
    daily:["نمذجة موديلات ثلاثية","texturing و lighting","render وتسليم مشاريع","متابعة ترندات الصناعة"],
    roadmap:[{t:"Blender أساسيات",d:"مجاني ومتكامل — ابدأ هنا"},{t:"Modeling",d:"بناء موديلات كاملة"},{t:"Materials & Lighting",d:"كيف تجعلها تبدو حقيقية"},{t:"Animation",d:"تحريك الموديلات"},{t:"مشاريع",d:"ألعاب، إعلانات، معمارية"}],
    course:"https://www.blender.org/support/tutorials/", example:"مصمم 3D يكسب 2000-5000$ شهرياً في استوديوهات الألعاب.",disabled: true },

  { id:"illustration", name:"رسم رقمي وإيلاسترشن", cat:"إبداعي", icon:"🖌️", desc:"إنشاء رسومات فنية رقمية لكتب، تطبيقات، ومنتجات.", difficulty:"متوسط", time:"3-8 أشهر", match:72, salary:"500-3000$",
    tools:["Procreate","Adobe Illustrator","Clip Studio Paint","Wacom Tablet"],
    daily:["رسم تصاميم لعملاء","تطوير أسلوب فني خاص","نشر أعمال على ArtStation","التعاون مع مؤلفين وناشرين"],
    roadmap:[{t:"أساسيات الرسم الرقمي",d:"Procreate على iPad"},{t:"أنواع الإيلاسترشن",d:"شخصيات، مناظر، أيقونات"},{t:"أسلوبك الخاص",d:"ابحث عن صوتك البصري"},{t:"Portfolio",d:"ArtStation + Behance"},{t:"عملاء",d:"ناشرون، تطبيقات، ألعاب"}],
    course:"https://www.youtube.com/@ProcreateApp", example:"رسام رقمي يكسب 1000-3000$ لمجموعة رسومات." ,disabled: true},

  { id:"motion", name:"موشن جرافيك", cat:"إبداعي", icon:"🎭", desc:"إضفاء الحياة على التصاميم بالحركة والتأثيرات البصرية.", difficulty:"متوسط", time:"4-8 أشهر", match:74, salary:"1000-5000$",
    tools:["After Effects","Cinema 4D","Adobe Animate","Lottie"],
    daily:["تصميم إنتروهات وإعلانات","animation للسوشيال ميديا","explainer videos","تسليم ملفات للمطورين"],
    roadmap:[{t:"After Effects أساسيات",d:"الأداة الأساسية في الصناعة"},{t:"Animation Principles",d:"12 مبدأ الرسوم المتحركة"},{t:"Typography Animation",d:"حرك النصوص بشكل احترافي"},{t:"3D في AE",d:"Camera و 3D Layers"},{t:"Portfolio",d:"5 قطع احترافية متنوعة"}],
    course:"https://www.motiondesignschool.com/", example:"مصمم موشن في وكالة إعلانية يكسب 2000-4000$ شهرياً." ,disabled: true},

  { id:"fashion", name:"تصميم أزياء", cat:"إبداعي", icon:"👗", desc:"إبداع تصاميم أزياء تمزج بين الفن والأناقة.", difficulty:"متوسط", time:"6-12 شهر", match:65, salary:"500-2000$",
    tools:["Sketch","Adobe Illustrator","CLO 3D","Pattern Making"],
    daily:["رسم تصاميم ملابس جديدة","البحث عن ترندات الموضة","التعاون مع خياطين","عرض تصاميم للعملاء"],
    roadmap:[{t:"أساسيات التصميم",d:"رسم أزياء ونظرية الألوان"},{t:"برامج التصميم",d:"Illustrator للرسم التقني"},{t:"خامات وأقمشة",d:"معرفة المواد والتقنيات"},{t:"مجموعة أولى",d:"صمم وانتج 5-10 قطع"},{t:"عرض وتسويق",d:"Instagram + Etsy + محلات"}],
    course:"https://www.coursera.org/learn/fashion-design", example:"مصمم أزياء مستقل يكسب 800-2000$ شهرياً.",disabled: true },
  // ===== تقني =====
  { id:"frontend", name:"مطور Frontend", cat:"تقني", icon:"💻", desc:"بناء واجهات المواقع والتطبيقات التي يراها الملايين.", difficulty:"متوسط", time:"4-8 أشهر", match:88, salary:"1000-5000$",
    longDesc:"مطور Frontend هو الشخص المسؤول عن كل حاجة بتشوفها بعينيك على الإنترنت — الأزرار والصفحات والألوان والتفاعل. بيكتب كود HTML وCSS وJavaScript ليحوّل التصميم لموقع حقيقي شغّال. فرصة دخوله للسوق أسرع من أي مسار تقني تاني، مش محتاج خلفية رياضيات عميقة، وبيبدأ بأدوات بسيطة ويتطور لـ React وغيرها.",
    tools:["Visual Studio Code"],
    daily:["كتابة كود وبناء صفحات","مراجعة كود الزملاء","حل مشاكل التوافق","تحسين الأداء والسرعة","التعاون مع المصممين"],
    roadmap:[{t:"HTML & CSS",d:"أساس كل شيء — ابدأ هنا"},{t:"JavaScript",d:"اجعل صفحاتك تفاعلية"},{t:"React.js",d:"أشهر مكتبة في السوق"},{t:"مشاريع حقيقية",d:"3 مواقع في Portfolio"},{t:"Freelance أو وظيفة",d:"تقدّم للفرص"}],
    course:"https://www.theodinproject.com/", example:"مطور Frontend مبتدئ يبدأ بـ 800-1500$ شهرياً.",
    tracks:[{
      id:"frontend-track", title:"Frontend Circle Roadmap 2026", subtitle:"من الصفر إلى محترف Fullstack",
      longDesc:"خارطة الطريق دي مقسّمة لـ 3 مراحل على مدار ~26 أسبوع، بتغطّي كل شيء من أساسيات HTML لحد بناء تطبيقات Fullstack بمستوى الإنتاج الحقيقي. المرحلة 1 (Foundation، 5 أسابيع): HTML · CSS · Git · التصميم المتجاوب → تبني وتنشر مواقع ثابتة. المرحلة 2 (Core Engineering، 13 أسبوع): JavaScript · DOM · API · OOP · SASS · NPM → تحل مشاكل برمجية وتبني تطبيقات تفاعلية. المرحلة 3 (Specialization، 8 أسابيع): React / Vue / Angular · إدارة الحالة · SSR → تشحن تطبيقات SPA وFullstack بمستوى احترافي. الإجمالي: ~26 أسبوع · أكثر من 15 مشروع تطبيقي · 3 مسارات فريمورك للاختيار من بينها.",
      level:"مبتدئ → متوسط", duration:"26 أسبوع (~6 أشهر)", totalLessons:269, icon:"💻", color:"#4f35e8", coverImage:"assets/pngtree-a-hand-writing-code-on-digital-interface-with-glowing-connections-symbolizing-image_17075797.jpg",
      intro:{
        tools:[
          {name:"Visual Studio Code", purpose:"محرر الكود", url:"https://code.visualstudio.com/Download"},
          {name:"Git", purpose:"التحكم بالإصدارات", url:"https://git-scm.com/downloads"},
          {name:"Node.js", purpose:"تشغيل JavaScript وأدوات البناء", url:"https://nodejs.org/"},
          {name:"Chrome DevTools", purpose:"فحص وتصحيح الصفحات", url:"https://developer.chrome.com/docs/devtools"}
        ],
        accounts:[
          {name:"GitHub", why:"استضافة الكود والتعاون", url:"https://github.com/"},
          {name:"LinkedIn", why:"التواصل المهني", url:"https://www.linkedin.com/"},
          {name:"LeetCode", why:"تمارين حل المشكلات", url:"https://leetcode.com/"},
          {name:"Frontend Mentor", why:"تحديات تصميم حقيقية", url:"https://www.frontendmentor.io/"}
        ],
        plan:[
          {title:"Phase 1: Foundation", duration:"5 أسابيع", goal:"بناء صفحات ثابتة منظّمة وجميلة تتبع أفضل الممارسات — HTML · CSS · Git · التصميم المتجاوب"},
          {title:"Phase 2: Core Engineering", duration:"13 أسبوع", goal:"احتراف JavaScript والخوارزميات والأدوات المهنية — JS · DOM · API · OOP · SASS · NPM"},
          {title:"Phase 3: Specialization", duration:"8 أسابيع", goal:"بناء تطبيقات SPA وFullstack بمستوى الإنتاج — React / Vue / Angular · إدارة الحالة · SSR"}
        ],
        challenge:[
          {name:"Frontend Mentor", url:"https://www.frontendmentor.io/"},
          {name:"CSS Battle", url:"https://cssbattle.dev/"},
          {name:"Codewell", url:"https://www.codewell.cc/challenges"}
        ]
      },
      courses:[
        { id:"html-week1", title:"الأسبوع 1: الإعداد والصياغة (HTML)", duration:"أسبوع", lessons:[
          {id:"html-e01", title:"مقدمة الكورس وماذا تحتاج لتتعلمه", duration:"11:05", type:"فيديو", videoUrl:"https://www.youtube.com/embed/6QAELgirvjs"},
          {id:"html-e02", title:"العناصر Elements والتعامل مع المتصفح", duration:"4:15", type:"فيديو", videoUrl:"https://www.youtube.com/embed/7LxA9qXUY5k"},
          {id:"html-e03", title:"أول مشروع وأول صفحة HTML", duration:"9:04", type:"فيديو", videoUrl:"https://www.youtube.com/embed/QG5aEmS9Fu0"},
          {id:"html-e04", title:"الـ Head والعناصر المتداخلة Nested Elements", duration:"8:01", type:"فيديو", videoUrl:"https://www.youtube.com/embed/dVgTBEYCseU"},
          {id:"html-e05", title:"التعليقات Comments واستخداماتها", duration:"4:53", type:"فيديو", videoUrl:"https://www.youtube.com/embed/3lXuWHtm7PM"},
          {id:"html-e06", title:"Doctype و Standard Mode و Quirks Mode", duration:"3:28", type:"فيديو", videoUrl:"https://www.youtube.com/embed/sBFemL2Mfj4"},
          {id:"html-e07", title:"العناوين Headings واستخداماتها", duration:"6:06", type:"فيديو", videoUrl:"https://www.youtube.com/embed/XxkX8wnRq3s"},
          {id:"html-e08", title:"صياغة الكود Syntax واختباره", duration:"4:52", type:"فيديو", videoUrl:"https://www.youtube.com/embed/S58smWj5Yn0"},
          {id:"html-e09", title:"الفقرات Paragraph", duration:"4:08", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Fpibp-291xQ"},
          {id:"html-e10", title:"خصائص العناصر Attributes", duration:"3:59", type:"فيديو", videoUrl:"https://www.youtube.com/embed/nCpNsMgyzh4"},
          {id:"html-e11", title:"عناصر تنسيق النص Formatting Elements", duration:"11:06", type:"فيديو", videoUrl:"https://www.youtube.com/embed/zhwqvfoi50Q"},
          {id:"html-e12", title:"الروابط Links - وسم Anchor", duration:"7:21", type:"فيديو", videoUrl:"https://www.youtube.com/embed/7TQhxAOjd1w"},
          {id:"html-e13", title:"الصور Image والتعامل مع المسارات Paths", duration:"6:53", type:"فيديو", videoUrl:"https://www.youtube.com/embed/FmIUk3bWGmU"},
          {id:"html-e14", title:"القوائم Lists - UL, OL, DL", duration:"9:25", type:"فيديو", videoUrl:"https://www.youtube.com/embed/8Z7zR-UGjcQ"},
          {id:"html-e15", title:"الجداول Table", duration:"11:53", type:"فيديو", videoUrl:"https://www.youtube.com/embed/SUW49Jjxvac"},
          {id:"html-e16", title:"Span و Break والخط الفاصل Horizontal Rule", duration:"5:13", type:"فيديو", videoUrl:"https://www.youtube.com/embed/T2myRpY2iN4"},
          {id:"html-e17", title:"وسم Div وكيفية استخدامه", duration:"7:40", type:"فيديو", videoUrl:"https://www.youtube.com/embed/IGeh2mlM9Rg"},
          {id:"html-e18", title:"رموز HTML الخاصة HTML Entities", duration:"4:33", type:"فيديو", videoUrl:"https://www.youtube.com/embed/B8raKziIYyY"},
          {id:"html-e19", title:"العناصر الدلالية Semantic Elements", duration:"6:26", type:"فيديو", videoUrl:"https://www.youtube.com/embed/xlQwlfvrDuI"},
          {id:"html-e20", title:"بناء تخطيط الصفحة باستخدام Div والـ Classes", duration:"5:52", type:"فيديو", videoUrl:"https://www.youtube.com/embed/r6LhFImQxeE"},
          {id:"html-e21", title:"بناء تخطيط الصفحة بالعناصر الدلالية Semantic Elements", duration:"4:32", type:"فيديو", videoUrl:"https://www.youtube.com/embed/uj5lC-GQPEw"},
          {id:"html-e22", title:"وسم الصوت Audio", duration:"6:09", type:"فيديو", videoUrl:"https://www.youtube.com/embed/KltQb6cJSd8"},
          {id:"html-e23", title:"وسم الفيديو Video", duration:"9:24", type:"فيديو", videoUrl:"https://www.youtube.com/embed/oJbo28ewnL4"},
          {id:"html-e24", title:"النماذج Forms (1) - أنواع الـ Input والـ Label", duration:"6:41", type:"فيديو", videoUrl:"https://www.youtube.com/embed/inC9gWjNMJI"},
          {id:"html-e25", title:"النماذج Forms (2) - Required و Placeholder و Value", duration:"8:25", type:"فيديو", videoUrl:"https://www.youtube.com/embed/3xd1IQ3llBk"},
          {id:"html-e26", title:"النماذج Forms (3) - Action و Name و Method", duration:"6:41", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Anfn7RzoDHw"},
          {id:"html-e27", title:"النماذج Forms (4) - Hidden و Reset و Color و Range و Number", duration:"7:14", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ZUax-YsT57I"},
          {id:"html-e28", title:"النماذج Forms (5) - ReadOnly و Disabled و Autofocus", duration:"7:15", type:"فيديو", videoUrl:"https://www.youtube.com/embed/rpPIRitcAn8"},
          {id:"html-e29", title:"النماذج Forms (6) - Radio و Checkbox", duration:"10:04", type:"فيديو", videoUrl:"https://www.youtube.com/embed/YAcn1MyAcDM"},
          {id:"html-e30", title:"النماذج Forms (7) - Select و Textarea", duration:"8:11", type:"فيديو", videoUrl:"https://www.youtube.com/embed/HGB42mnD0o4"},
          {id:"html-e31", title:"النماذج Forms (8) - File و Search و URL و Time", duration:"5:09", type:"فيديو", videoUrl:"https://www.youtube.com/embed/cSmE9cVeaYg"},
          {id:"html-e32", title:"النماذج Forms (9) - Data List و Novalidate و Target", duration:"5:14", type:"فيديو", videoUrl:"https://www.youtube.com/embed/X_TGbRuZ80Q"},
          {id:"html-e33", title:"Q و BlockQuote و Wbr و Bdi و Button", duration:"6:12", type:"فيديو", videoUrl:"https://www.youtube.com/embed/AzjtVtxoBLc"},
          {id:"html-e34", title:"iFrame و Pre و Code", duration:"5:29", type:"فيديو", videoUrl:"https://www.youtube.com/embed/aycYLVSOtZo"},
          {id:"html-e35", title:"مقدمة في إمكانية الوصول Accessibility", duration:"8:04", type:"فيديو", videoUrl:"https://www.youtube.com/embed/lSqXHePabFo"},
          {id:"html-e36", title:"ARIA وقارئات الشاشة Screen Readers", duration:"8:43", type:"فيديو", videoUrl:"https://www.youtube.com/embed/UnTxFfbpqco"},
          {id:"html-e37", title:"خاتمة الكورس وماذا تفعل بعد ذلك", duration:"3:13", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ysJQH5uPfTg"}
        ]},
        { id:"css-week2", title:"الأسبوع 2: أساسيات CSS", duration:"أسبوع", lessons:[
          {id:"css-e01", title:"مقدمة الكورس وماذا تحتاج لتتعلمه", duration:"8:22", type:"فيديو", videoUrl:"https://www.youtube.com/embed/X1ulCwyhCVM"},
          {id:"css-e02", title:"أول مشروع وصياغة الكود Syntax", duration:"8:41", type:"فيديو", videoUrl:"https://www.youtube.com/embed/89VLfs-wpEY"},
          {id:"css-e03", title:"تنسيق العناصر Element Styling", duration:"6:25", type:"فيديو", videoUrl:"https://www.youtube.com/embed/66sjwQ-hB64"},
          {id:"css-e04", title:"قواعد وأسلوب تسمية الـ Selectors", duration:"8:02", type:"فيديو", videoUrl:"https://www.youtube.com/embed/xkNpIsbxMuo"},
          {id:"css-e05", title:"الخلفية Background - اللون والصورة والتكرار Repeat", duration:"7:55", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-srybsn3YDM"},
          {id:"css-e06", title:"الخلفية Background - Attachment و Position و Size", duration:"8:09", type:"فيديو", videoUrl:"https://www.youtube.com/embed/8sooTBY5C4w"},
          {id:"css-e07", title:"الحشو الداخلي Padding", duration:"9:02", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-wdlA-wFv9A"},
          {id:"css-e08", title:"الهامش الخارجي Margin", duration:"8:16", type:"فيديو", videoUrl:"https://www.youtube.com/embed/LEJkJ0AiKDw"},
          {id:"css-e09", title:"الحدود Border", duration:"5:57", type:"فيديو", videoUrl:"https://www.youtube.com/embed/XE7d1OoljyI"},
          {id:"css-e10", title:"الإطار الخارجي Outline", duration:"6:39", type:"فيديو", videoUrl:"https://www.youtube.com/embed/NyOaxP-Adac"},
          {id:"css-e11", title:"نظام العرض Display - Block, Inline Block, Inline", duration:"11:54", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-qbGxua98To"},
          {id:"css-e12", title:"ظهور العناصر Visibility واستخداماتها", duration:"5:14", type:"فيديو", videoUrl:"https://www.youtube.com/embed/g2URo6kLtgg"},
          {id:"css-e13", title:"تجميع أكثر من Selector معاً", duration:"5:57", type:"فيديو", videoUrl:"https://www.youtube.com/embed/NTccbXHW7AM"},
          {id:"css-e14", title:"التداخل Nesting", duration:"5:19", type:"فيديو", videoUrl:"https://www.youtube.com/embed/wo_S_Mfl3yg"},
          {id:"css-e15", title:"الأبعاد Dimensions - العرض Width والارتفاع Height", duration:"8:14", type:"فيديو", videoUrl:"https://www.youtube.com/embed/GIWYpmiv1Hc"},
          {id:"css-e16", title:"التجاوز Overflow - Overflow-X و Overflow-Y", duration:"4:53", type:"فيديو", videoUrl:"https://www.youtube.com/embed/FQLRSbVdk28"},
          {id:"css-e17", title:"النص Text - اللون Color والظل Shadow", duration:"3:53", type:"فيديو", videoUrl:"https://www.youtube.com/embed/P3xdm7md7AE"},
          {id:"css-e18", title:"النص Text - المحاذاة Alignment", duration:"4:48", type:"فيديو", videoUrl:"https://www.youtube.com/embed/IqCXELTTymo"},
          {id:"css-e19", title:"النص Text - التزيين Decoration والتحويل Transform", duration:"4:06", type:"فيديو", videoUrl:"https://www.youtube.com/embed/E-7k6sySXwE"},
          {id:"css-e20", title:"النص Text - التباعد Spacing", duration:"10:05", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Hphs2vBjmQs"},
          {id:"css-e21", title:"النص Text - Overflow واستخداماته", duration:"4:01", type:"فيديو", videoUrl:"https://www.youtube.com/embed/0uWk0Ucz3c4"},
          {id:"css-e22", title:"الوراثة Inheritance", duration:"5:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/fXcY14cm4_I"},
          {id:"css-e23", title:"الطباعة Typography - نوع الخط Font Family", duration:"10:47", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ftjKy7AAjVU"},
          {id:"css-e24", title:"الطباعة Typography - حجم الخط ووحدات CSS", duration:"9:13", type:"فيديو", videoUrl:"https://www.youtube.com/embed/LDGfu6O5mI8"},
          {id:"css-e25", title:"الطباعة Typography - Font Style و Variant و Weight", duration:"4:46", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-siTKk8QqHo"},
          {id:"css-e26", title:"شكل المؤشر Mouse Cursor", duration:"4:15", type:"فيديو", videoUrl:"https://www.youtube.com/embed/l2Oz9QKd1PU"},
          {id:"css-e27", title:"Float و Clear", duration:"9:03", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ZAb-oI23Oc4"},
          {id:"css-e28", title:"احتراف الحسابات في CSS - دالة Calc", duration:"8:54", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Sujl_fq_Ofc"},
          {id:"css-e29", title:"الشفافية Opacity", duration:"3:12", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-3Q7sjYxStM"},
          {id:"css-e30", title:"التموضع Position", duration:"11:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-q5IyjKkKSc"},
          {id:"css-e31", title:"الترتيب الرأسي Z-Index", duration:"6:50", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Parqs9bbRMY"},
          {id:"css-e32", title:"تنسيق القوائم Lists Styling", duration:"7:14", type:"فيديو", videoUrl:"https://www.youtube.com/embed/8VH59jP5s1M"},
          {id:"css-e33", title:"تنسيق الجداول Table Styling", duration:"7:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/WgUbPZBh5cI"},
          {id:"css-e34", title:"الأصناف الزائفة Pseudo Classes", duration:"11:28", type:"فيديو", videoUrl:"https://www.youtube.com/embed/vEAPPfJfpk0"},
          {id:"css-e35", title:"العناصر الزائفة Pseudo Elements - First Letter, First Line, Selection", duration:"6:49", type:"فيديو", videoUrl:"https://www.youtube.com/embed/6bZCaDyimCI"},
          {id:"css-e36", title:"العناصر الزائفة Pseudo Elements - Before, After, Content", duration:"11:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/OIWZ4EXwlnA"},
          {id:"css-e37", title:"العناصر الزائفة Pseudo Elements - Content وتدريبات", duration:"9:18", type:"فيديو", videoUrl:"https://www.youtube.com/embed/4WT2eO8aM7U"},
          {id:"css-e38", title:"بادئات المتصفحات Vendor Prefixes", duration:"9:09", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ZLNzjq4U8Ws"},
          {id:"css-e39", title:"تدوير الحواف Border Radius", duration:"6:11", type:"فيديو", videoUrl:"https://www.youtube.com/embed/76-r7wWCdkM"},
          {id:"css-e40", title:"ظل الصندوق Box Shadow وأمثلة", duration:"7:14", type:"فيديو", videoUrl:"https://www.youtube.com/embed/QGdK5Lrqxcg"},
          {id:"css-e41", title:"نموذج الصندوق The Box Model و Box Sizing", duration:"7:20", type:"فيديو", videoUrl:"https://www.youtube.com/embed/9PDCOviQOwo"},
          {id:"css-e42", title:"الانتقال Transition", duration:"13:28", type:"فيديو", videoUrl:"https://www.youtube.com/embed/B9wYvMHLCVE"},
          {id:"css-e43", title:"أداة !Important واستخداماتها", duration:"5:23", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Lpy5XkEpp2A"},
          {id:"css-e44", title:"انهيار الهامش Margin Collapse", duration:"7:50", type:"فيديو", videoUrl:"https://www.youtube.com/embed/0Zek-O9bzAo"},
          {id:"css-e45", title:"متغيرات CSS Variables وتدريبات", duration:"8:34", type:"فيديو", videoUrl:"https://www.youtube.com/embed/qATtKrSvvEo"},
          {id:"css-e46", title:"Flexbox الأساسي (الحاوية الأب) - Direction و Wrap و Flow", duration:"9:22", type:"فيديو", videoUrl:"https://www.youtube.com/embed/JkCLL1CzNZk"},
          {id:"css-e47", title:"Flexbox الأساسي (الحاوية الأب) - Justify Content", duration:"10:37", type:"فيديو", videoUrl:"https://www.youtube.com/embed/_ScoBsCdJ7U"},
          {id:"css-e48", title:"Flexbox الأساسي (الحاوية الأب) - Align Items", duration:"4:56", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Nn-tFHepLoo"},
          {id:"css-e49", title:"Flexbox الأساسي (الحاوية الأب) - Align Content", duration:"5:33", type:"فيديو", videoUrl:"https://www.youtube.com/embed/sOlpkte0gPs"},
          {id:"css-e50", title:"Flexbox الفرعي (العنصر الابن) - Grow و Shrink و Order", duration:"6:56", type:"فيديو", videoUrl:"https://www.youtube.com/embed/F5a6wj3hfbg"},
          {id:"css-e51", title:"Flexbox الفرعي (العنصر الابن) - Flex Basis و Flex Shorthand", duration:"8:58", type:"فيديو", videoUrl:"https://www.youtube.com/embed/0W8KopNcyRY"},
          {id:"css-e52", title:"Flexbox الفرعي (العنصر الابن) - Align Self وتدريبات", duration:"3:23", type:"فيديو", videoUrl:"https://www.youtube.com/embed/t2e4aYHrowQ"},
          {id:"css-e53", title:"إنهاء لعبة Flex Froggy للتمرين على Flexbox", duration:"11:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-sUqEXFzbII"}
        ]},
        { id:"css-week3", title:"الأسبوع 3: التأثيرات البصرية", duration:"أسبوع", lessons:[
          {id:"css-e54", title:"المرشحات Filters", duration:"3:56", type:"فيديو", videoUrl:"https://www.youtube.com/embed/2v9ZhqX6YOk"},
          {id:"css-e55", title:"التدرجات اللونية Gradients", duration:"12:22", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Skjr9fycnio"},
          {id:"css-e56", title:"أحداث المؤشر Pointer Events وألوان الـ Caret", duration:"4:40", type:"فيديو", videoUrl:"https://www.youtube.com/embed/I6zKVKCewDc"},
          {id:"css-e57", title:"Grid الأساسي (الحاوية الأب) - Template Columns", duration:"11:33", type:"فيديو", videoUrl:"https://www.youtube.com/embed/wYSAjaB3mL8"},
          {id:"css-e58", title:"Grid الأساسي (الحاوية الأب) - Template Rows و Gap", duration:"7:54", type:"فيديو", videoUrl:"https://www.youtube.com/embed/gZ3XNPelC5Y"},
          {id:"css-e59", title:"Grid الأساسي (الحاوية الأب) - Justify Content و Align Content", duration:"4:39", type:"فيديو", videoUrl:"https://www.youtube.com/embed/IsXAEilbm64"},
          {id:"css-e60", title:"Grid الأساسي (الحاوية الأب) - تخطيط كامل بـ Template Areas", duration:"11:52", type:"فيديو", videoUrl:"https://www.youtube.com/embed/q6VtSllQHHo"},
          {id:"css-e61", title:"Grid الفرعي (العنصر الابن) - Grid Column و Grid Row", duration:"7:24", type:"فيديو", videoUrl:"https://www.youtube.com/embed/7RZr_1qvR2g"},
          {id:"css-e62", title:"Grid الفرعي (العنصر الابن) - Grid Area وتدريبات", duration:"6:36", type:"فيديو", videoUrl:"https://www.youtube.com/embed/BJupwn_ii8g"},
          {id:"css-e63", title:"Grid - دوال Min و Max و Auto Fill", duration:"7:48", type:"فيديو", videoUrl:"https://www.youtube.com/embed/NO4IeLSKNdw"},
          {id:"css-e64", title:"إنهاء لعبة Grid Garden للتمرين على Grid", duration:"17:41", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-UvL4OoIsHo"},
          {id:"css-e65", title:"التحويل ثنائي الأبعاد 2D Transform - التكبير Scale", duration:"4:55", type:"فيديو", videoUrl:"https://www.youtube.com/embed/9KQP22oVCMg"},
          {id:"css-e66", title:"التحويل ثنائي الأبعاد 2D Transform - التدوير Rotate", duration:"7:11", type:"فيديو", videoUrl:"https://www.youtube.com/embed/AtOB_b0Cjyo"},
          {id:"css-e67", title:"التحويل ثنائي الأبعاد 2D Transform - النقل Translate", duration:"5:18", type:"فيديو", videoUrl:"https://www.youtube.com/embed/PklNgYpJSXs"}
        ]},
        { id:"css-week4", title:"الأسبوع 4: احتراف التخطيط (Flexbox & Grid)", duration:"أسبوع", lessons:[
          {id:"css-e68", title:"التحويل ثنائي الأبعاد 2D Transform - الميل Skew", duration:"5:01", type:"فيديو", videoUrl:"https://www.youtube.com/embed/N2G8JUK7kJs"},
          {id:"css-e69", title:"التحويل ثنائي الأبعاد 2D Transform - المصفوفة Matrix", duration:"7:16", type:"فيديو", videoUrl:"https://www.youtube.com/embed/OsypTHsvnVI"},
          {id:"css-e70", title:"نقطة الأساس للتحويل Transform Origin", duration:"8:29", type:"فيديو", videoUrl:"https://www.youtube.com/embed/DW0-7s_xJ90"},
          {id:"css-e71", title:"التحويل ثلاثي الأبعاد 3D Transform - التدوير Rotate", duration:"6:12", type:"فيديو", videoUrl:"https://www.youtube.com/embed/WF9LU1IIERM"},
          {id:"css-e72", title:"التحويل ثلاثي الأبعاد 3D Transform - Translate و Perspective", duration:"4:48", type:"فيديو", videoUrl:"https://www.youtube.com/embed/FnIdCYWmJ8A"},
          {id:"css-e73", title:"التحويل ثلاثي الأبعاد 3D Transform - Backface Visibility وعكس المنتج", duration:"9:17", type:"فيديو", videoUrl:"https://www.youtube.com/embed/7G-a-PHsGyM"},
          {id:"css-e74", title:"الحركة Animation - KeyFrames والاسم والمدة Duration", duration:"6:56", type:"فيديو", videoUrl:"https://www.youtube.com/embed/cfq7u52lvfI"},
          {id:"css-e75", title:"الحركة Animation - عدد التكرار وToming Function وتدريب Spinner", duration:"4:28", type:"فيديو", videoUrl:"https://www.youtube.com/embed/NPy2GGDX-kg"},
          {id:"css-e76", title:"الحركة Animation - Direction و Fill Mode و Play State و Delay", duration:"11:04", type:"فيديو", videoUrl:"https://www.youtube.com/embed/P2QAAXONOac"},
          {id:"css-e77", title:"تدريب على حركة التحميل Loading Animation للأعلى والأسفل", duration:"6:02", type:"فيديو", videoUrl:"https://www.youtube.com/embed/9Q8W2YK3dyk"},
          {id:"css-e78", title:"مرجع شامل لمحددات CSS - الجزء 1", duration:"9:28", type:"فيديو", videoUrl:"https://www.youtube.com/embed/PbKHU1Fb1oQ"},
          {id:"css-e79", title:"مرجع شامل لمحددات CSS - الجزء 2", duration:"9:17", type:"فيديو", videoUrl:"https://www.youtube.com/embed/WPOpfk_eCVE"},
          {id:"css-e80", title:"مرجع شامل لمحددات CSS - الجزء 3", duration:"10:13", type:"فيديو", videoUrl:"https://www.youtube.com/embed/NJThXQrhmB0"},
          {id:"css-e81", title:"مرجع شامل لمحددات CSS - الجزء 4", duration:"9:14", type:"فيديو", videoUrl:"https://www.youtube.com/embed/s6vDg-XoZ_Y"},
          {id:"css-e82", title:"مرجع شامل لمحددات CSS - الجزء 5", duration:"7:57", type:"فيديو", videoUrl:"https://www.youtube.com/embed/eN9HxtDHREM"},
          {id:"css-e83", title:"مقدمة في Media Queries والتصميم المتجاوب Responsive", duration:"9:02", type:"فيديو", videoUrl:"https://www.youtube.com/embed/F9FAcVwSV4c"},
          {id:"css-e84", title:"معايير Media Queries والتصميم المتجاوب", duration:"11:31", type:"فيديو", videoUrl:"https://www.youtube.com/embed/b2rWjPIZDT0"},
          {id:"css-e85", title:"تطبيق عملي على Media Queries والتصميم المتجاوب", duration:"11:44", type:"فيديو", videoUrl:"https://www.youtube.com/embed/QdXQ0Wa9oPY"},
          {id:"css-e86", title:"بناء Framework خاص بك", duration:"10:00", type:"فيديو", videoUrl:"https://www.youtube.com/embed/xkFDwIPOzik"},
          {id:"css-e87", title:"القيم العامة في CSS - Global Values", duration:"10:43", type:"فيديو", videoUrl:"https://www.youtube.com/embed/iueBHixQyX0"},
          {id:"css-e88", title:"خاتمة الكورس وكيف تحترف HTML و CSS", duration:"6:46", type:"فيديو", videoUrl:"https://www.youtube.com/embed/YKUkssSbVls"}
        ]},
        { id:"css-reference", title:"مقالات مرجعية: Flexbox & Grid", duration:"—", lessons:[
          {id:"css-ref-01", title:"دليل شامل لـ Flexbox", duration:"", type:"قراءة", videoUrl:"https://css-tricks.com/snippets/css/a-guide-to-flexbox/"},
          {id:"css-ref-02", title:"دليل شامل لـ CSS Grid", duration:"", type:"قراءة", videoUrl:"https://css-tricks.com/snippets/css/complete-guide-grid/"},
          {id:"css-ref-03", title:"كل شيء عن التموضع CSS Positioning", duration:"", type:"قراءة", videoUrl:"https://css-tricks.com/almanac/properties/p/position/"},
          {id:"css-ref-04", title:"كل شيء عن متغيرات CSS Variables", duration:"", type:"قراءة", videoUrl:"https://css-tricks.com/everything-need-know-css-variables/"},
          {id:"css-ref-05", title:"كل شيء عن حركات CSS Animations", duration:"", type:"قراءة", videoUrl:"https://css-tricks.com/almanac/properties/a/animation/"},
          {id:"css-ref-06", title:"Flexbox CSS في 20 دقيقة (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/JJSoEo8JSnc"},
          {id:"css-ref-07", title:"كورس مكثف عن CSS Grid Layout (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/jV8B24rSN5o"}
        ]},
        { id:"css-week5-final-boss", title:"الأسبوع 5: التحدي الأخير — دمج كامل لمشروع HTML/CSS", duration:"أسبوع", lessons:[
          {id:"w5-tmpl-01", title:"مشروع HTML/CSS Template 1 (قائمة تشغيل)", duration:"", type:"مشروع", videoUrl:"https://youtube.com/playlist?list=PLDoPjvoNmBAzHSjcR-HnW9tnxyuye8KbF"},
          {id:"w5-tmpl-02", title:"مشروع HTML/CSS Template 2 (قائمة تشغيل)", duration:"", type:"مشروع", videoUrl:"https://youtube.com/playlist?list=PLDoPjvoNmBAy1l-2A21ng3gxEyocruT0t"},
          {id:"w5-extra-01", title:"تدريب إضافي: عمل نسخة من صفحة Starbucks (Traversy Media)", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/embed/x_n2FGNsm0o"},
          {id:"w5-extra-02", title:"تدريب إضافي: عمل نسخة من صفحة تسجيل دخول Pluralsight", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/embed/wIx1O5Y5EB4"},
          {id:"w5-extra-03", title:"أفضل طريقة لبناء شريط تنقل Nav", duration:"", type:"مشروع", videoUrl:"https://youtu.be/SkML640BcoA"},
          {id:"w5-extra-04", title:"احتراف التصميم المتجاوب Responsive Design", duration:"", type:"مشروع", videoUrl:"https://youtu.be/x4u1yp3Msao"}
        ]},
        { id:"challenge-yourself-1", title:"تحدّى نفسك: منصات تدريب إضافية", duration:"—", lessons:[
          {id:"challenge-01", title:"Frontend Mentor — تحديات واجهات احترافية", duration:"", type:"قراءة", videoUrl:"https://www.frontendmentor.io/"},
          {id:"challenge-02", title:"Codewell — تحويل تصميمات مجانية لكود", duration:"", type:"قراءة", videoUrl:"https://www.codewell.cc/challenges"},
          {id:"challenge-03", title:"CSS Battle — تحديات حل مشاكل CSS", duration:"", type:"قراءة", videoUrl:"https://cssbattle.dev/"},
          {id:"challenge-04", title:"Frontend Practice — اعمل نسخة من مواقع حقيقية", duration:"", type:"قراءة", videoUrl:"https://www.frontendpractice.com/projects"},
          {id:"challenge-05", title:"Graphberry Templates — قوالب مجانية للتطبيق", duration:"", type:"قراءة", videoUrl:"https://www.graphberry.com/"},
          {id:"challenge-06", title:"Devchallenges — تحديات تصميم متجاوب تدريجية", duration:"", type:"قراءة", videoUrl:"https://devchallenges.io/paths/responsive-web-developer"}
        ]},
        { id:"git-github-resources", title:"موارد أساسية: Git & GitHub", duration:"—", lessons:[
          {id:"git-res-01", title:"كورس Git بالعربي — Elzero (قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAw4eOj58MZPakHjaO3frVMF"},
          {id:"git-res-02", title:"كورس Git بالعربي — أكاديمية الخوارزميات (قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/playlist?list=PLfDx4cQoUNOYVfQs_NFNyykcqkaJ_plmK"},
          {id:"git-res-03", title:"Git & GitHub — شخبط وانت متطمن", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Q6G-J54vgKc"},
          {id:"git-res-04", title:"الكتاب الرسمي لـ Git (إنجليزي)", duration:"", type:"قراءة", videoUrl:"https://git-scm.com/book/en/v2"},
          {id:"git-res-05", title:"ورقة مرجعية لأوامر Git (Cheat Sheet)", duration:"", type:"قراءة", videoUrl:"https://github.com/FADL285/git-cheat-sheet"},
          {id:"git-res-06", title:"دليل GitHub Hello World (إنجليزي)", duration:"", type:"قراءة", videoUrl:"https://guides.github.com/activities/hello-world/"}
        ]},
        { id:"html-extra-resources", title:"موارد إضافية: HTML", duration:"—", lessons:[
          {id:"html-extra-01", title:"كورس HTML — W3Schools", duration:"", type:"قراءة", videoUrl:"https://www.w3schools.com/html/default.asp"},
          {id:"html-extra-02", title:"أساسيات HTML — MDN Web Docs", duration:"", type:"قراءة", videoUrl:"https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics"}
        ]},
        { id:"css-extra-resources", title:"موارد إضافية: CSS", duration:"—", lessons:[
          {id:"css-extra-01", title:"تعلّم CSS — web.dev", duration:"", type:"قراءة", videoUrl:"https://web.dev/learn/css/"},
          {id:"css-extra-02", title:"كورس CSS — W3Schools", duration:"", type:"قراءة", videoUrl:"https://www.w3schools.com/Css/"},
          {id:"css-extra-03", title:"مرجع CSS الكامل — MDN", duration:"", type:"قراءة", videoUrl:"https://developer.mozilla.org/en-US/docs/Web/CSS"}
        ]},
        { id:"interview-prep-phase1", title:"الاستعداد للمقابلات: HTML & CSS", duration:"—", lessons:[
          {id:"interview-html-01", title:"أسئلة مقابلات HTML (InterviewBit)", duration:"", type:"قراءة", videoUrl:"https://www.interviewbit.com/html-interview-questions/"},
          {id:"interview-html-02", title:"فيديو أسئلة مقابلات HTML", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/OGNcpEX5nvg"},
          {id:"interview-css-01", title:"أسئلة مقابلات CSS (InterviewBit)", duration:"", type:"قراءة", videoUrl:"https://www.interviewbit.com/css-interview-questions/"},
          {id:"interview-css-02", title:"فيديو أسئلة مقابلات CSS", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/CxhOM8O28rg"}
        ]},
        { id:"quiz-html-css", title:"🧪 اختبارات: HTML & CSS", duration:"—", quizCourse:true, lessons:[
          {id:"quiz-html-01", title:"اختبار HTML: الوسوم الأساسية",     duration:"10 دقائق", videoUrl:"https://www.interviewbit.com/html-interview-questions/", type:"تدريب", quizData:{lang:"html", topic:"html-basics-tags", questions:[
            {q:"ما الوسم الصحيح لعنوان رئيسي كبير؟",  opts:["<h1>","<header>","<title>","<h6>"], ans:0,videoUrl:"https://www.interviewbit.com/html-interview-questions/"},
            {q:"ما الوسم المستخدم لإضافة رابط؟",       opts:["<link>","<a>","<href>","<url>"],   ans:1},
            {q:"أي وسم يُستخدم لإضافة صورة؟",         opts:["<img>","<image>","<src>","<pic>"],  ans:0},
            {q:"ما الوسم الصحيح لقائمة غير مرتبة؟",   opts:["<ol>","<li>","<ul>","<list>"],     ans:2},
            {q:"أين تُكتب البيانات الوصفية Meta؟",     opts:["<body>","<footer>","<head>","<main>"],ans:2}
          ]}},
          {id:"quiz-html-02", title:"اختبار HTML: النماذج Forms",        duration:"10 دقائق", videoUrl:"https://www.interviewbit.com/html-interview-questions/", type:"تدريب", quizData:{lang:"html", topic:"html-forms", questions:[
            {q:"ما الوسم المستخدم لإنشاء نموذج؟",      opts:["<input>","<form>","<button>","<select>"], ans:1,videoUrl:"https://www.interviewbit.com/html-interview-questions/"},
            {q:"أي نوع input يُظهر مربع اختيار؟",      opts:["radio","select","checkbox","toggle"],     ans:2},
            {q:"ما الخاصية التي تحدد وجهة إرسال النموذج؟",opts:["href","src","action","target"],       ans:2},
            {q:"أي type يُخفي كلمة المرور عند الكتابة؟",opts:["hidden","password","secret","text"],    ans:1},
            {q:"ما الوسم المستخدم لخيارات القائمة المنسدلة؟",opts:["<list>","<option>","<item>","<choice>"],ans:1}
          ]}},
          {id:"quiz-html-03", title:"اختبار HTML: Semantic Elements",    duration:"10 دقائق", videoUrl:"https://developer.mozilla.org/en-US/docs/Learn/HTML", type:"تدريب", quizData:{lang:"html", topic:"html-semantic", questions:[
            {q:"أي وسم يمثل رأس الصفحة الدلالي؟",    opts:["<top>","<head>","<header>","<h1>"],       ans:2,videoUrl:"https://developer.mozilla.org/en-US/docs/Learn/HTML"},
            {q:"أي وسم يُستخدم للشريط الجانبي؟",      opts:["<side>","<aside>","<panel>","<div>"],     ans:1},
            {q:"ما الوسم الدلالي للتنقل؟",             opts:["<menu>","<links>","<nav>","<ul>"],        ans:2},
            {q:"أي وسم يمثل محتوى مستقل مثل مقال؟",  opts:["<section>","<article>","<content>","<p>"],ans:1},
            {q:"ما وسم تذييل الصفحة؟",                opts:["<end>","<bottom>","<foot>","<footer>"],   ans:3}
          ]}},
          {id:"quiz-css-01", title:"اختبار CSS: المحددات Selectors",     duration:"10 دقائق", videoUrl:"https://www.interviewbit.com/css-interview-questions/", type:"تدريب", quizData:{lang:"css", topic:"css-selectors", questions:[
            {q:"كيف تحدد عنصر بـ class اسمه box؟",   opts:[".box","#box","*box","box"],                ans:0,videoUrl:"https://www.interviewbit.com/css-interview-questions/"},
            {q:"كيف تحدد عنصر بـ id اسمه main؟",     opts:[".main","#main","@main","*main"],            ans:1},
            {q:"ما معنى المحدد * في CSS؟",             opts:["كل عناصر class","عنصر محدد","كل العناصر","عنصر id"],ans:2},
            {q:"كيف تحدد كل <p> داخل <div>؟",        opts:["div+p","div>p","div p","div~p"],            ans:2},
            {q:"ما المحدد الذي يستهدف الابن المباشر فقط؟",opts:["div p","div+p","div>p","div~p"],      ans:2}
          ]}},
          {id:"quiz-css-02", title:"اختبار CSS: Box Model",               duration:"10 دقائق", videoUrl:"https://www.interviewbit.com/css-interview-questions/", type:"تدريب", quizData:{lang:"css", topic:"css-box-model", questions:[
            {q:"ما ترتيب Box Model من الداخل للخارج؟",opts:["border→padding→margin","content→padding→border→margin","margin→border→padding","content→margin→border"],ans:1,videoUrl:"https://www.interviewbit.com/css-interview-questions/"},
            {q:"أي خاصية تتحكم في المسافة الداخلية؟", opts:["margin","border","padding","spacing"],     ans:2},
            {q:"أي خاصية تتحكم في المسافة الخارجية؟", opts:["padding","margin","border","gap"],         ans:1},
            {q:"كيف تُخفي محتوى يتجاوز حجم العنصر؟", opts:["overflow:auto","overflow:hidden","display:none","visibility:hidden"],ans:1},
            {q:"ما قيمة box-sizing التي تدرج padding في العرض؟",opts:["content-box","border-box","padding-box","full-box"],ans:1}
          ]}},
          {id:"quiz-css-03", title:"اختبار CSS: Flexbox",                 duration:"10 دقائق", videoUrl:"https://css-tricks.com/snippets/css/a-guide-to-flexbox/", type:"تدريب", quizData:{lang:"css", topic:"css-flexbox", questions:[
            {q:"ما الخاصية التي تُفعّل Flexbox؟",     opts:["display:grid","display:flex","flex:1","flex-wrap:wrap"],ans:1,videoUrl:"https://css-tricks.com/snippets/css/a-guide-to-flexbox/"},
            {q:"كيف تمركز العناصر أفقياً في Flexbox؟",opts:["align-items:center","justify-content:center","text-align:center","margin:auto"],ans:1},
            {q:"ما خاصية محور القطع الثانوي في Flex؟", opts:["justify-content","flex-direction","align-items","flex-wrap"],ans:2},
            {q:"كيف تجعل العناصر تنزل لسطر جديد؟",    opts:["flex-wrap:wrap","flex-direction:column","flex-flow:row","flex-break:true"],ans:0},
            {q:"ما قيمة flex-direction العمودية؟",     opts:["row","column","wrap","vertical"],           ans:1}
          ]}},
          {id:"quiz-css-04", title:"اختبار CSS: Grid",                    duration:"10 دقائق", videoUrl:"https://css-tricks.com/snippets/css/complete-guide-grid/", type:"تدريب", quizData:{lang:"css", topic:"css-grid", questions:[
            {q:"ما الخاصية التي تُفعّل Grid؟",         opts:["display:flex","display:grid","grid:true","layout:grid"],ans:1,videoUrl:"https://css-tricks.com/snippets/css/complete-guide-grid/"},
            {q:"كيف تنشئ 3 أعمدة متساوية؟",            opts:["grid-columns:3","columns:3","grid-template-columns:1fr 1fr 1fr","flex:3"],ans:2},
            {q:"ما معنى fr في Grid؟",                   opts:["pixel ثابت","نسبة مئوية","وحدة كسرية","وزن العمود"],ans:2},
            {q:"كيف تجعل عنصر يمتد على عمودين؟",       opts:["grid-column:2","span:2","grid-column:span 2","colspan:2"],ans:2},
            {q:"ما الخاصية للمسافة بين خلايا Grid؟",   opts:["margin","padding","gap","spacing"],         ans:2}
          ]}},
        ]},

        { id:"js-week1", title:"الأسبوع 1: الصياغة والتخطيطات (Syntax & Layouts)", duration:"أسبوع", lessons:[
          {id:"js-e001", title:"مقدمة الكورس وما هي الجافاسكريبت JavaScript؟", duration:"9:01", type:"فيديو", videoUrl:"https://www.youtube.com/embed/GM6dQBmc-Xg"},
          {id:"js-e002", title:"كيف تذاكر هذا الكورس؟", duration:"7:26", type:"فيديو", videoUrl:"https://www.youtube.com/embed/MAauLwSHO6Y"},
          {id:"js-e003", title:"تجهيز بيئة العمل والأدوات", duration:"6:29", type:"فيديو", videoUrl:"https://www.youtube.com/embed/5wAtDN_CLgI"},
          {id:"js-e004", title:"التعامل مع Chrome Developer Tools", duration:"5:34", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ig_1bvufUPo"},
          {id:"js-e005", title:"أين تضع الكود؟", duration:"4:45", type:"فيديو", videoUrl:"https://www.youtube.com/embed/XQCG-zf71Mk"},
          {id:"js-e006", title:"التعليقات Comments والممارسات الخاطئة", duration:"4:27", type:"فيديو", videoUrl:"https://www.youtube.com/embed/x6kJMXxqmNo"},
          {id:"js-e007", title:"إخراج البيانات على الشاشة", duration:"6:32", type:"فيديو", videoUrl:"https://www.youtube.com/embed/FYRypqj4Epw"},
          {id:"js-e008", title:"دوال الـ Console والتنسيق وWebAPI", duration:"6:19", type:"فيديو", videoUrl:"https://www.youtube.com/embed/g0SBnmqOvgQ"},
          {id:"js-e009", title:"ما هو ECMAScript؟", duration:"6:41", type:"فيديو", videoUrl:"https://www.youtube.com/embed/6RLo08fmGXg"},
          {id:"js-e010", title:"أنواع البيانات Data Types ومعامل Typeof", duration:"10:13", type:"فيديو", videoUrl:"https://www.youtube.com/embed/WaMYDuohE1A"},
          {id:"js-e011", title:"مقدمة عن المتغيرات Variables", duration:"6:31", type:"فيديو", videoUrl:"https://www.youtube.com/embed/NgLgguhL2to"},
          {id:"js-e012", title:"قواعد وأسلوب تسمية المتغيرات Identifiers", duration:"4:09", type:"فيديو", videoUrl:"https://www.youtube.com/embed/8ADaKFTeB3M"},
          {id:"js-e013", title:"مقارنة Var و Let و Const", duration:"7:18", type:"فيديو", videoUrl:"https://www.youtube.com/embed/gyWwPypW4OU"},
          {id:"js-e014", title:"صياغة النصوص String وحروف الهروب Escape Sequences", duration:"7:34", type:"فيديو", videoUrl:"https://www.youtube.com/embed/TzWla9f9VCY"},
          {id:"js-e015", title:"الدمج Concatenation", duration:"2:53", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ikK5I2gcrag"},
          {id:"js-e016", title:"Template Literals (Template Strings)", duration:"8:16", type:"فيديو", videoUrl:"https://www.youtube.com/embed/8KjqKNlvVXk"},
          {id:"js-e017", title:"تدريب على المتغيرات والدمج", duration:"3:02", type:"فيديو", videoUrl:"https://www.youtube.com/embed/rzmKwzHaETI"},
          {id:"js-e018", title:"العمليات الحسابية Arithmetic Operators", duration:"8:30", type:"فيديو", videoUrl:"https://www.youtube.com/embed/jhy86kqiSsk"},
          {id:"js-e019", title:"معاملات Unary Plus و Negation", duration:"5:24", type:"فيديو", videoUrl:"https://www.youtube.com/embed/liNl80DgHr8"},
          {id:"js-e020", title:"تحويل الأنواع Type Coercion", duration:"5:57", type:"فيديو", videoUrl:"https://www.youtube.com/embed/YFUVqq68sZU"},
          {id:"js-e021", title:"معاملات التعيين Assignment Operators", duration:"3:15", type:"فيديو", videoUrl:"https://www.youtube.com/embed/n2BSsnzPr5c"},
          {id:"js-e022", title:"تدريبات على العمليات Operators", duration:"3:26", type:"فيديو", videoUrl:"https://www.youtube.com/embed/yCogS7sHyxk"},
          {id:"js-e023", title:"الأرقام Number", duration:"7:15", type:"فيديو", videoUrl:"https://www.youtube.com/embed/7dMp1Iwtf24"},
          {id:"js-e024", title:"دوال الأرقام Number Methods", duration:"8:19", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ECs2mCrS8Sc"},
          {id:"js-e025", title:"كائن الرياضيات Math Object", duration:"5:01", type:"فيديو", videoUrl:"https://www.youtube.com/embed/xBNM5Zbnh8Q"},
          {id:"js-e026", title:"تدريب على الأرقام Number", duration:"2:27", type:"فيديو", videoUrl:"https://www.youtube.com/embed/bu9_Wx-vO44"},
          {id:"js-e027", title:"دوال النصوص String Methods - الجزء 1", duration:"8:29", type:"فيديو", videoUrl:"https://www.youtube.com/embed/GtmsTGAq64s"},
          {id:"js-e028", title:"دوال النصوص String Methods - الجزء 2", duration:"12:39", type:"فيديو", videoUrl:"https://www.youtube.com/embed/3h2FBrcNOMQ"},
          {id:"js-e029", title:"دوال النصوص String Methods - الجزء 3", duration:"12:58", type:"فيديو", videoUrl:"https://www.youtube.com/embed/_vg-kxWEubk"},
          {id:"js-e030", title:"تدريب على النصوص String", duration:"2:51", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-m-XctesrVM"}
        ]},
        { id:"js-week2", title:"الأسبوع 2: التحكم بسير البرنامج (Control Flow & Cloning)", duration:"أسبوع", lessons:[
          {id:"js-e031", title:"معاملات المقارنة Comparison Operators", duration:"6:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/YmgGtaCDP9Q"},
          {id:"js-e032", title:"المعاملات المنطقية Logical Operators", duration:"4:45", type:"فيديو", videoUrl:"https://www.youtube.com/embed/SR3wFWdsEaM"},
          {id:"js-e033", title:"جملة الشرط If", duration:"8:51", type:"فيديو", videoUrl:"https://www.youtube.com/embed/rUa4NQQn7Zc"},
          {id:"js-e034", title:"الشرط المتداخل Nested If", duration:"5:14", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Innbt6DX64A"},
          {id:"js-e035", title:"معامل الشرط المختصر Ternary Operator", duration:"7:17", type:"فيديو", videoUrl:"https://www.youtube.com/embed/zfBgIOaDBOM"},
          {id:"js-e036", title:"معامل Nullish Coalescing ومعامل Or المنطقي", duration:"4:36", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-VU6Gumxs4k"},
          {id:"js-e037", title:"تدريب على جملة If", duration:"2:48", type:"فيديو", videoUrl:"https://www.youtube.com/embed/qQ8AOc69GEI"},
          {id:"js-e038", title:"جملة Switch", duration:"6:05", type:"فيديو", videoUrl:"https://www.youtube.com/embed/1-5bIDFybDk"},
          {id:"js-e039", title:"تدريب على Switch وIf", duration:"3:30", type:"فيديو", videoUrl:"https://www.youtube.com/embed/UYOmHW-5vwQ"},
          {id:"js-e040", title:"مقدمة شاملة عن المصفوفات Array", duration:"8:10", type:"فيديو", videoUrl:"https://www.youtube.com/embed/MLVJhya1CV0"},
          {id:"js-e041", title:"استخدام Length مع المصفوفات", duration:"5:45", type:"فيديو", videoUrl:"https://www.youtube.com/embed/COMiJl7l6kw"},
          {id:"js-e042", title:"الإضافة والحذف من المصفوفة", duration:"5:21", type:"فيديو", videoUrl:"https://www.youtube.com/embed/VvPxe6qj5XY"},
          {id:"js-e043", title:"البحث في المصفوفة Searching Array", duration:"5:38", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ss75DBXkZ4Y"},
          {id:"js-e044", title:"ترتيب المصفوفات Sorting Arrays", duration:"3:16", type:"فيديو", videoUrl:"https://www.youtube.com/embed/1hOTVQKYtNY"},
          {id:"js-e045", title:"تقطيع المصفوفة Slicing Array", duration:"7:16", type:"فيديو", videoUrl:"https://www.youtube.com/embed/MLcZ-12YW0U"},
          {id:"js-e046", title:"دمج المصفوفات Joining Arrays", duration:"3:43", type:"فيديو", videoUrl:"https://www.youtube.com/embed/gDgw2sobpdU"},
          {id:"js-e047", title:"تدريب على المصفوفات Array", duration:"2:14", type:"فيديو", videoUrl:"https://www.youtube.com/embed/YSxfPXLfSQM"},
          {id:"js-e048", title:"الحلقات Loop - For ومفهوم التكرار", duration:"8:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/NnR4sYnnBoI"},
          {id:"js-e049", title:"التكرار على البيانات المتسلسلة Sequences", duration:"8:13", type:"فيديو", videoUrl:"https://www.youtube.com/embed/cgr2f_wmxmY"},
          {id:"js-e050", title:"الحلقات المتداخلة Nested Loops وتدريبات", duration:"4:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/xPAk_2sed_M"},
          {id:"js-e051", title:"التحكم بالحلقات - Break و Continue و Label", duration:"7:14", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Z3fF7MrBPXc"},
          {id:"js-e052", title:"حلقة For - مثال متقدم", duration:"4:39", type:"فيديو", videoUrl:"https://www.youtube.com/embed/2bK3u5qbzik"},
          {id:"js-e053", title:"تدريب عملي - إضافة منتجات للصفحة", duration:"6:56", type:"فيديو", videoUrl:"https://www.youtube.com/embed/5kD2LeFKPzE"},
          {id:"js-e054", title:"الحلقة While", duration:"5:03", type:"فيديو", videoUrl:"https://www.youtube.com/embed/CkTIcjLufCE"},
          {id:"js-e055", title:"الحلقة Do While", duration:"3:32", type:"فيديو", videoUrl:"https://www.youtube.com/embed/STs3tI1kDzM"},
          {id:"js-e056", title:"تدريب على الحلقات Loop", duration:"3:31", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Db2QlMCFOIY"},
          {id:"w2-visual-task", title:"مهمة بصرية: عمل نسخة من صفحة Starbucks", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/embed/x_n2FGNsm0o"}
        ]},
        { id:"js-week3", title:"الأسبوع 3: الدوال والنماذج (Functions & Forms)", duration:"أسبوع", lessons:[
          {id:"js-e057", title:"مقدمة عن الدوال Function والاستخدام الأساسي", duration:"8:14", type:"فيديو", videoUrl:"https://www.youtube.com/embed/wJ7hjluDQHI"},
          {id:"js-e058", title:"أمثلة متقدمة على الدوال Function", duration:"6:22", type:"فيديو", videoUrl:"https://www.youtube.com/embed/zIy3YMFhy-o"},
          {id:"js-e059", title:"إرجاع القيمة Return من الدالة واستخداماتها", duration:"7:22", type:"فيديو", videoUrl:"https://www.youtube.com/embed/QuO3APKjP7o"},
          {id:"js-e060", title:"القيم الافتراضية للدالة Default Parameters", duration:"4:42", type:"فيديو", videoUrl:"https://www.youtube.com/embed/J_2BRSluV7U"},
          {id:"js-e061", title:"Rest Parameters في الدوال", duration:"7:04", type:"فيديو", videoUrl:"https://www.youtube.com/embed/XTZVhG90lM0"},
          {id:"js-e062", title:"تدريب شامل على الدوال Function", duration:"11:39", type:"فيديو", videoUrl:"https://www.youtube.com/embed/fx7IxbfDEFY"},
          {id:"js-e063", title:"تدريب - دالة بعدد معاملات عشوائي", duration:"3:21", type:"فيديو", videoUrl:"https://www.youtube.com/embed/rLbr9bPrNcg"},
          {id:"js-e064", title:"الدوال غير المسماة Anonymous Function وتدريب", duration:"8:44", type:"فيديو", videoUrl:"https://www.youtube.com/embed/p2tjvCWSAfE"},
          {id:"js-e065", title:"إرجاع دالة متداخلة Return Nested Function", duration:"6:34", type:"فيديو", videoUrl:"https://www.youtube.com/embed/N2skhUPDWjw"},
          {id:"js-e066", title:"صياغة دوال الأسهم Arrow Function", duration:"6:12", type:"فيديو", videoUrl:"https://www.youtube.com/embed/UdCzA_upIbw"},
          {id:"js-e067", title:"النطاق Scope - العام Global والمحلي Local", duration:"6:10", type:"فيديو", videoUrl:"https://www.youtube.com/embed/y1J61Ho_e4g"},
          {id:"js-e068", title:"النطاق Scope - الخاص بالـ Block", duration:"4:54", type:"فيديو", videoUrl:"https://www.youtube.com/embed/MPJSE3lNkD4"},
          {id:"js-e069", title:"النطاق Scope - اللفظي Lexical (الثابت)", duration:"5:17", type:"فيديو", videoUrl:"https://www.youtube.com/embed/mM8U1qOq2hg"},
          {id:"js-e070", title:"تدريب على دوال الأسهم Arrow Function", duration:"2:48", type:"فيديو", videoUrl:"https://www.youtube.com/embed/JHOaa3dmMSU"},
          {id:"w3-visual-task-1", title:"مهمة بصرية 1: عمل نسخة من صفحة تسجيل دخول Pluralsight", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/embed/wIx1O5Y5EB4"},
          {id:"w3-visual-task-2", title:"مهمة بصرية 2: ابدأ مشروع HTML/CSS Template 4 (قائمة تشغيل)", duration:"", type:"مشروع", videoUrl:"https://youtube.com/playlist?list=PLDoPjvoNmBAyGaRGzPVZCkYx5L7Mo9Tbh"}
        ]},
        { id:"js-week4", title:"الأسبوع 4: المنطق المتقدم (Higher Order Logic)", duration:"أسبوع", lessons:[
          {id:"js-e071", title:"الدوال العليا Higher Order Functions - دالة Map", duration:"8:46", type:"فيديو", videoUrl:"https://www.youtube.com/embed/hTUsHXxEvHc"},
          {id:"js-e072", title:"الدوال العليا Higher Order Functions - تدريب على Map", duration:"8:53", type:"فيديو", videoUrl:"https://www.youtube.com/embed/T3rJ5JMxvgE"},
          {id:"js-e073", title:"الدوال العليا Higher Order Functions - دالة Filter", duration:"6:44", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Np6AzHRR38s"},
          {id:"js-e074", title:"الدوال العليا Higher Order Functions - تدريب على Filter", duration:"5:36", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-7UzTnJeUL8"},
          {id:"js-e075", title:"الدوال العليا Higher Order Functions - دالة Reduce", duration:"7:39", type:"فيديو", videoUrl:"https://www.youtube.com/embed/F2dIgixMePE"},
          {id:"js-e076", title:"الدوال العليا Higher Order Functions - تدريب على Reduce", duration:"5:47", type:"فيديو", videoUrl:"https://www.youtube.com/embed/EvZdtTz4KAs"},
          {id:"js-e077", title:"الدوال العليا Higher Order Functions - دالة ForEach وتدريب", duration:"12:02", type:"فيديو", videoUrl:"https://www.youtube.com/embed/O1Fq0xZThAg"},
          {id:"js-e078", title:"الدوال العليا Higher Order Functions - تدريب شامل", duration:"2:23", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Wn-JbwQLAlA"},
          {id:"js-e079", title:"مقدمة عن الكائنات Object", duration:"7:44", type:"فيديو", videoUrl:"https://www.youtube.com/embed/9dkSSPWu_qY"},
          {id:"js-e080", title:"الفرق بين Dot Notation و Bracket Notation", duration:"6:23", type:"فيديو", videoUrl:"https://www.youtube.com/embed/C9AWlPyd9lo"},
          {id:"js-e081", title:"الكائنات المتداخلة Nested Object وتدريبات متقدمة", duration:"8:43", type:"فيديو", videoUrl:"https://www.youtube.com/embed/PbWkJcPrA1g"},
          {id:"js-e082", title:"إنشاء كائن بكلمة New", duration:"4:25", type:"فيديو", videoUrl:"https://www.youtube.com/embed/OIu_q4Ekg3w"},
          {id:"js-e083", title:"كلمة This", duration:"5:31", type:"فيديو", videoUrl:"https://www.youtube.com/embed/XnK3JYPtAJI"},
          {id:"js-e084", title:"إنشاء كائن بدالة Create", duration:"6:36", type:"فيديو", videoUrl:"https://www.youtube.com/embed/pCT0ukMWqcQ"},
          {id:"js-e085", title:"إنشاء كائن بدالة Assign", duration:"4:22", type:"فيديو", videoUrl:"https://www.youtube.com/embed/3DCEt5quosE"}
        ]},
        { id:"module-b-intro", title:"⚡ Module B: التفاعل مع DOM (الأسابيع 5-7) — موارد Bootstrap", duration:"—", lessons:[
          {id:"module-b-bootstrap-docs", title:"توثيق Bootstrap 5 الرسمي", duration:"", type:"قراءة", videoUrl:"https://getbootstrap.com/"},
          {id:"module-b-bootstrap-ar1", title:"كورس Bootstrap 4 بالعربي — عبدالرحمن جمال", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/EzHbZjXDdKc"},
          {id:"module-b-bootstrap-ar2", title:"كورس Bootstrap 5 (Bondi Design) — Elzero (قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLDoPjvoNmBAyvm7f--dc6XqkpfDcen_vQ"},
          {id:"module-b-bootstrap-project", title:"مشروع: بناء Landing Page متجاوبة بـ Bootstrap", duration:"", type:"مشروع", videoUrl:"https://getbootstrap.com/docs/5.3/examples/"}
        ]},
        { id:"js-week5", title:"الأسبوع 5: DOM و Bootstrap", duration:"أسبوع", lessons:[
          {id:"js-e086", title:"ما هو DOM وكيفية اختيار العناصر؟", duration:"11:37", type:"فيديو", videoUrl:"https://www.youtube.com/embed/AOabnOI4vOQ"},
          {id:"js-e087", title:"قراءة وتعديل محتوى وخصائص العناصر", duration:"9:44", type:"فيديو", videoUrl:"https://www.youtube.com/embed/9j9XvUnWndI"},
          {id:"js-e088", title:"فحص الخصائص Attributes وأمثلة", duration:"7:40", type:"فيديو", videoUrl:"https://www.youtube.com/embed/H6KTmUWx9A0"},
          {id:"js-e089", title:"إنشاء وإضافة عناصر جديدة للصفحة", duration:"7:16", type:"فيديو", videoUrl:"https://www.youtube.com/embed/JNCu3XIjluk"},
          {id:"js-e090", title:"تدريب - إنشاء منتج بعنوان ووصف", duration:"5:58", type:"فيديو", videoUrl:"https://www.youtube.com/embed/QQ6g0Yryh_s"},
          {id:"js-e091", title:"التعامل مع العناصر الأبناء Children", duration:"5:23", type:"فيديو", videoUrl:"https://www.youtube.com/embed/DA3zF8Pm9Tc"},
          {id:"js-e092", title:"أحداث DOM Events", duration:"8:59", type:"فيديو", videoUrl:"https://www.youtube.com/embed/BFd05UsHP48"},
          {id:"js-e093", title:"التحقق من النموذج Form ومنع السلوك الافتراضي", duration:"10:06", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Iq0K54HzdGs"},
          {id:"js-e094", title:"محاكاة الأحداث - Click و Focus و Blur", duration:"4:40", type:"فيديو", videoUrl:"https://www.youtube.com/embed/XY7GjH0DwYM"},
          {id:"js-e095", title:"كائن Class List ودواله", duration:"5:49", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ShSLbgFu4gg"},
          {id:"js-e096", title:"تنسيق CSS عبر الجافاسكريبت وStylesheets", duration:"6:53", type:"فيديو", videoUrl:"https://www.youtube.com/embed/GELiBxWNdmo"},
          {id:"js-e097", title:"Before و After و Prepend و Append و Remove", duration:"4:45", type:"فيديو", videoUrl:"https://www.youtube.com/embed/5dTV-28Z868"},
          {id:"js-e098", title:"التنقل بين عناصر DOM - DOM Traversing", duration:"5:06", type:"فيديو", videoUrl:"https://www.youtube.com/embed/oTvOBJO5KHQ"},
          {id:"js-e099", title:"نسخ عناصر DOM - DOM Cloning", duration:"3:57", type:"فيديو", videoUrl:"https://www.youtube.com/embed/b3YxfLUzaFc"},
          {id:"js-e100", title:"دالة AddEventListener", duration:"9:38", type:"فيديو", videoUrl:"https://www.youtube.com/embed/OsrT0kxQCvA"},
          {id:"js-e101", title:"تدريب شامل على DOM", duration:"3:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/mGhGjzIKEqk"}
        ]},
        { id:"dom-crash-course-extra", title:"إضافي: كورس DOM المكثف (4 أجزاء)", duration:"—", lessons:[
          {id:"dom-extra-01", title:"كورس DOM المكثف — الجزء 1", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/0ik6X4DJKCc"},
          {id:"dom-extra-02", title:"كورس DOM المكثف — الجزء 2", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/mPd2aJXCZ2g"},
          {id:"dom-extra-03", title:"كورس DOM المكثف — الجزء 3", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/wK2cBMcDTss"},
          {id:"dom-extra-04", title:"كورس DOM المكثف — الجزء 4 (مشروع تطبيقي)", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/embed/i37KVt_IcXw"}
        ]},
        { id:"js-week6", title:"الأسبوع 6: البيانات الدائمة (BOM)", duration:"أسبوع", lessons:[
          {id:"js-e102", title:"ما هو BOM؟", duration:"4:24", type:"فيديو", videoUrl:"https://www.youtube.com/embed/KxhIRUjcdxQ"},
          {id:"js-e103", title:"Alert و Confirm و Prompt", duration:"9:12", type:"فيديو", videoUrl:"https://www.youtube.com/embed/bRvu4_3uubQ"},
          {id:"js-e104", title:"setTimeout و clearTimeout", duration:"7:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/vwERdirszK4"},
          {id:"js-e105", title:"setInterval و clearInterval", duration:"4:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-4tIbTx55nQ"},
          {id:"js-e106", title:"كائن Window Location", duration:"12:24", type:"فيديو", videoUrl:"https://www.youtube.com/embed/6UZIhbPEUGg"},
          {id:"js-e107", title:"فتح وإغلاق النوافذ Window Open/Close", duration:"6:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/M7LO4aTXW_I"},
          {id:"js-e108", title:"كائن Window History", duration:"3:41", type:"فيديو", videoUrl:"https://www.youtube.com/embed/UhQ0RIdCB3M"},
          {id:"js-e109", title:"Scroll و ScrollTo و ScrollBy و Focus و Print و Stop", duration:"8:01", type:"فيديو", videoUrl:"https://www.youtube.com/embed/kJslAJD39Nk"},
          {id:"js-e110", title:"تدريب - الرجوع لأعلى الصفحة Scroll To Top", duration:"5:55", type:"فيديو", videoUrl:"https://www.youtube.com/embed/TkAgnDT3ZjM"},
          {id:"js-e111", title:"التخزين المحلي Local Storage", duration:"9:49", type:"فيديو", videoUrl:"https://www.youtube.com/embed/n64yffJXsHY"},
          {id:"js-e112", title:"تدريب - تطبيق ألوان بالـ Local Storage", duration:"10:10", type:"فيديو", videoUrl:"https://www.youtube.com/embed/QsGN8B8g8QE"},
          {id:"js-e113", title:"التخزين المؤقت Session Storage واستخداماته", duration:"6:56", type:"فيديو", videoUrl:"https://www.youtube.com/embed/lT-hZqsKfu4"},
          {id:"js-e114", title:"تدريب شامل على BOM", duration:"2:44", type:"فيديو", videoUrl:"https://www.youtube.com/embed/LzKt8GaoFMs"},
          {id:"w6-project", title:"مشروع: Todo List V2 (بيانات دائمة بـ LocalStorage)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/ylsFXMHpFUQ"}
        ]},
        { id:"js-week7", title:"الأسبوع 7: البيانات المتقدمة والتعبيرات النمطية (Regex)", duration:"أسبوع", lessons:[
          {id:"js-e115", title:"تفكيك المصفوفات Destructuring Arrays - الجزء 1", duration:"6:23", type:"فيديو", videoUrl:"https://www.youtube.com/embed/tR6VARwdmzA"},
          {id:"js-e116", title:"تفكيك المصفوفات Destructuring Arrays - الجزء 2", duration:"4:29", type:"فيديو", videoUrl:"https://www.youtube.com/embed/cv3LaTelG3I"},
          {id:"js-e117", title:"تفكيك المصفوفات Destructuring Arrays - الجزء 3 (تبديل المتغيرات)", duration:"3:43", type:"فيديو", videoUrl:"https://www.youtube.com/embed/NnTQs7dYVf0"},
          {id:"js-e118", title:"تفكيك الكائنات Destructuring Objects - الجزء 1", duration:"5:09", type:"فيديو", videoUrl:"https://www.youtube.com/embed/4_McBh1NcAk"},
          {id:"js-e119", title:"تفكيك الكائنات Destructuring Objects - الجزء 2", duration:"6:01", type:"فيديو", videoUrl:"https://www.youtube.com/embed/zq-ErjysJ84"},
          {id:"js-e120", title:"تفكيك معاملات الدالة Destructuring Function Parameters", duration:"3:08", type:"فيديو", videoUrl:"https://www.youtube.com/embed/2WtdhvOkgcs"},
          {id:"js-e121", title:"تفكيك محتوى مختلط Destructuring Mixed Content", duration:"4:17", type:"فيديو", videoUrl:"https://www.youtube.com/embed/I6mI4GW6Du4"},
          {id:"js-e122", title:"تدريب شامل على Destructuring", duration:"2:49", type:"فيديو", videoUrl:"https://www.youtube.com/embed/n21fO9TER7c"},
          {id:"js-e123", title:"نوع البيانات Set ودواله", duration:"8:40", type:"فيديو", videoUrl:"https://www.youtube.com/embed/lsirOGbdWYA"},
          {id:"js-e124", title:"الفرق بين Set و WeakSet وجامع القمامة Garbage Collector", duration:"10:57", type:"فيديو", videoUrl:"https://www.youtube.com/embed/umjMxxzvYsI"},
          {id:"js-e125", title:"نوع البيانات Map مقارنة بالكائن Object", duration:"10:15", type:"فيديو", videoUrl:"https://www.youtube.com/embed/VN8btoo2DII"},
          {id:"js-e126", title:"دوال Map", duration:"5:33", type:"فيديو", videoUrl:"https://www.youtube.com/embed/xLfjINocEok"},
          {id:"js-e127", title:"الفرق بين Map و WeakMap", duration:"6:52", type:"فيديو", videoUrl:"https://www.youtube.com/embed/kA3Xjh3WQlA"},
          {id:"js-e128", title:"دالة Array.from", duration:"7:28", type:"فيديو", videoUrl:"https://www.youtube.com/embed/gaesHQz41oc"},
          {id:"js-e129", title:"دالة Array.copyWithin", duration:"8:13", type:"فيديو", videoUrl:"https://www.youtube.com/embed/M5aiQTPJQ10"},
          {id:"js-e130", title:"دالة Array.some", duration:"9:40", type:"فيديو", videoUrl:"https://www.youtube.com/embed/nrmA_yGlG0g"},
          {id:"js-e131", title:"دالة Array.every", duration:"4:38", type:"فيديو", videoUrl:"https://www.youtube.com/embed/A-Tb2nY1Kfo"},
          {id:"js-e132", title:"صياغة الانتشار Spread Syntax واستخداماتها", duration:"7:33", type:"فيديو", videoUrl:"https://www.youtube.com/embed/D9UdBHoAOzg"},
          {id:"js-e133", title:"تدريب شامل على Map و Set", duration:"3:37", type:"فيديو", videoUrl:"https://www.youtube.com/embed/SuxyO5je5XY"},
          {id:"w7-project-1", title:"مشروع 1: عداد تنازلي Countdown Timer", duration:"", type:"مشروع", videoUrl:"https://youtu.be/eFsiOTJrrE8"},
          {id:"w7-project-2", title:"مشروع 2: عمل نسخة من صفحة Netflix", duration:"", type:"مشروع", videoUrl:"https://youtu.be/P7t13SGytRk"}
        ]},
        { id:"module-c-intro", title:"🧠 Module C: الهندسة المتقدمة (الأسابيع 8-10)", duration:"—", lessons:[
          {id:"module-c-note", title:"بداية Module C: الهندسة المتقدمة (الأسابيع 8-10)", duration:"", type:"قراءة", videoUrl:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"}
        ]},
        { id:"js-week8", title:"الأسبوع 8: أنماط البيانات والتعبيرات النمطية", duration:"أسبوع", lessons:[
          {id:"js-e134", title:"مقدمة - ما هي التعبيرات النمطية Regular Expression؟", duration:"8:26", type:"فيديو", videoUrl:"https://www.youtube.com/embed/V-8vs_teVlo"},
          {id:"js-e135", title:"التعبيرات النمطية - المُعدِّلات Modifiers", duration:"5:20", type:"فيديو", videoUrl:"https://www.youtube.com/embed/c5ZyMM0CKzk"},
          {id:"js-e136", title:"التعبيرات النمطية - النطاقات Ranges - الجزء 1", duration:"10:19", type:"فيديو", videoUrl:"https://www.youtube.com/embed/HcVBlbDHbFA"},
          {id:"js-e137", title:"التعبيرات النمطية - النطاقات Ranges - الجزء 2", duration:"6:16", type:"فيديو", videoUrl:"https://www.youtube.com/embed/3f30hJMi4jI"},
          {id:"js-e138", title:"التعبيرات النمطية - فئات الحروف Character Classes - الجزء 1", duration:"6:26", type:"فيديو", videoUrl:"https://www.youtube.com/embed/gYB66iXxKlM"},
          {id:"js-e139", title:"التعبيرات النمطية - فئات الحروف Character Classes - الجزء 2", duration:"5:42", type:"فيديو", videoUrl:"https://www.youtube.com/embed/jrg1p3Xv6E0"},
          {id:"js-e140", title:"التعبيرات النمطية - أدوات التكرار Quantifiers - الجزء 1", duration:"9:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/n_E9It_E2eo"},
          {id:"js-e141", title:"التعبيرات النمطية - أدوات التكرار Quantifiers - الجزء 2", duration:"2:43", type:"فيديو", videoUrl:"https://www.youtube.com/embed/f1DBhT9YKvI"},
          {id:"js-e142", title:"التعبيرات النمطية - أدوات التكرار Quantifiers - الجزء 3", duration:"5:16", type:"فيديو", videoUrl:"https://www.youtube.com/embed/k0JeghEiRBg"},
          {id:"js-e143", title:"التعبيرات النمطية - الاستبدال بنمط Replace", duration:"3:23", type:"فيديو", videoUrl:"https://www.youtube.com/embed/08ny8Udc4Ug"},
          {id:"js-e144", title:"التعبيرات النمطية - التحقق من النماذج Form Validation", duration:"4:48", type:"فيديو", videoUrl:"https://www.youtube.com/embed/tFtDqOzD1g0"},
          {id:"js-e145", title:"اختبار التعبيرات النمطية ومناقشات", duration:"4:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/aTBNZ3jKHpA"},
          {id:"js-e146", title:"تدريب شامل على التعبيرات النمطية Regular Expressions", duration:"2:08", type:"فيديو", videoUrl:"https://www.youtube.com/embed/_n_oiZRqH_k"}
        ]},
        { id:"js-week9", title:"الأسبوع 9: البرمجة الكائنية (OOP)", duration:"أسبوع", lessons:[
          {id:"js-e147", title:"مقدمة في البرمجة الكائنية OOP", duration:"6:59", type:"فيديو", videoUrl:"https://www.youtube.com/embed/uv5OULDiCXg"},
          {id:"js-e148", title:"مقدمة عن دالة المُنشئ Constructor Function", duration:"8:23", type:"فيديو", videoUrl:"https://www.youtube.com/embed/_zBImgVB3Pk"},
          {id:"js-e149", title:"صياغة دالة المُنشئ الجديدة New Syntax", duration:"4:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/QvE2IJxF2H4"},
          {id:"js-e150", title:"التعامل مع الخصائص Properties والدوال Methods", duration:"5:07", type:"فيديو", videoUrl:"https://www.youtube.com/embed/tMvXS98_KgI"},
          {id:"js-e151", title:"تحديث الخصائص والمُنشِئات المدمجة Built-in Constructors", duration:"5:25", type:"فيديو", videoUrl:"https://www.youtube.com/embed/vBqlMWCejSA"},
          {id:"js-e152", title:"الخصائص والدوال الثابتة Static في الـ Class", duration:"4:59", type:"فيديو", videoUrl:"https://www.youtube.com/embed/xFCh7Whz5gw"},
          {id:"js-e153", title:"الوراثة Class Inheritance", duration:"7:29", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Rhjht0ATx-4"},
          {id:"js-e154", title:"التغليف Class Encapsulation", duration:"7:44", type:"فيديو", videoUrl:"https://www.youtube.com/embed/EPp4KTSpVFY"},
          {id:"js-e155", title:"مقدمة عن Prototype", duration:"3:18", type:"فيديو", videoUrl:"https://www.youtube.com/embed/iKEunMHFmVc"},
          {id:"js-e156", title:"الإضافة لسلسلة Prototype وتوسيع خصائص المُنشئ", duration:"7:10", type:"فيديو", videoUrl:"https://www.youtube.com/embed/boUkOH37_tM"},
          {id:"js-e157", title:"بيانات الكائن الوصفية Meta Data و Descriptor - الجزء 1", duration:"6:18", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Fn33wjewamg"},
          {id:"js-e158", title:"بيانات الكائن الوصفية Meta Data و Descriptor - الجزء 2", duration:"2:43", type:"فيديو", videoUrl:"https://www.youtube.com/embed/IMy3si0WJkE"},
          {id:"js-e159", title:"مقدمة عن التاريخ والوقت Date And Time", duration:"7:27", type:"فيديو", videoUrl:"https://www.youtube.com/embed/G5Ql9pQFxJA"},
          {id:"js-e160", title:"قراءة التاريخ والوقت Get Date And Time", duration:"5:40", type:"فيديو", videoUrl:"https://www.youtube.com/embed/lljWW6UEEhI"},
          {id:"js-e161", title:"تعيين التاريخ والوقت Set Date And Time", duration:"6:31", type:"فيديو", videoUrl:"https://www.youtube.com/embed/rahCIVgxc50"},
          {id:"js-e162", title:"تنسيق التاريخ والوقت Formatting", duration:"5:22", type:"فيديو", videoUrl:"https://www.youtube.com/embed/N4aYazqnvYQ"},
          {id:"js-e163", title:"حساب زمن تنفيذ العمليات Tracking Operations Time", duration:"3:36", type:"فيديو", videoUrl:"https://www.youtube.com/embed/YhOuTEAImyk"},
          {id:"js-e164", title:"مقدمة عن دوال المولِّد Generator Function", duration:"7:00", type:"فيديو", videoUrl:"https://www.youtube.com/embed/6t4YL6aa2XU"},
          {id:"js-e165", title:"تفويض دالة المولِّد Delegate Generator Function", duration:"3:43", type:"فيديو", videoUrl:"https://www.youtube.com/embed/lYb4pnr1nYM"},
          {id:"js-e166", title:"توليد أرقام لا نهائية Infinite Numbers", duration:"3:08", type:"فيديو", videoUrl:"https://www.youtube.com/embed/zjANdEj6QSs"},
          {id:"js-e167", title:"الوحدات Modules - الاستيراد Import والتصدير Export", duration:"4:25", type:"فيديو", videoUrl:"https://www.youtube.com/embed/3NZEb3uPLtM"},
          {id:"js-e168", title:"Named Export و Default Export واستيراد الكل", duration:"4:21", type:"فيديو", videoUrl:"https://www.youtube.com/embed/xbW_gX9KIak"},
          {id:"w9-project-1", title:"مشروع 1: تطبيق اختبار (Quiz App) بـ OOP", duration:"", type:"مشروع", videoUrl:"https://youtu.be/T5QyLcmcMJ4"},
          {id:"w9-project-2", title:"مشروع 2: نظام إدارة منتجات (CRUD)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/nJZAvdUhUMs"}
        ]},
        { id:"oop-crash-course-extra", title:"إضافي: كورس OOP مكثف (ES5 & ES6)", duration:"—", lessons:[
          {id:"oop-extra-01", title:"كورس JavaScript OOP المكثف (ES5 & ES6)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/vDJpGenyHaA"}
        ]},
        { id:"js-week10", title:"الأسبوع 10: البرمجة غير المتزامنة وواجهات API", duration:"أسبوع", lessons:[
          {id:"js-e169", title:"ما هو JSON؟", duration:"3:43", type:"فيديو", videoUrl:"https://www.youtube.com/embed/VA_AROETZ58"},
          {id:"js-e170", title:"صياغة JSON ومقارنته بكائن الجافاسكريبت", duration:"3:39", type:"فيديو", videoUrl:"https://www.youtube.com/embed/mCAe4RZSLrM"},
          {id:"js-e171", title:"ما هو API؟", duration:"8:35", type:"فيديو", videoUrl:"https://www.youtube.com/embed/J8_DaHkqw5o"},
          {id:"js-e172", title:"دالتا Parse و Stringify", duration:"3:56", type:"فيديو", videoUrl:"https://www.youtube.com/embed/Hoj5Kkn5tSU"},
          {id:"js-e173", title:"البرمجة المتزامنة Synchronous والغير متزامنة Asynchronous", duration:"6:00", type:"فيديو", videoUrl:"https://www.youtube.com/embed/qsncfaOUpyg"},
          {id:"js-e174", title:"Call Stack وواجهات الويب Web API", duration:"6:30", type:"فيديو", videoUrl:"https://www.youtube.com/embed/AzBaH0wNEos"},
          {id:"js-e175", title:"حلقة الأحداث Event Loop وطابور الـ Callback", duration:"7:56", type:"فيديو", videoUrl:"https://www.youtube.com/embed/e-oSGQz7eT8"},
          {id:"js-e176", title:"ما هو AJAX؟ ومعلومات الشبكة Network", duration:"5:08", type:"فيديو", videoUrl:"https://www.youtube.com/embed/X-RkZHyzidc"},
          {id:"js-e177", title:"إرسال طلب واستقبال استجابة من API حقيقي", duration:"5:44", type:"فيديو", videoUrl:"https://www.youtube.com/embed/-RmWQYMGeIs"},
          {id:"js-e178", title:"التكرار على البيانات القادمة من API", duration:"4:12", type:"فيديو", videoUrl:"https://www.youtube.com/embed/26ZkK1JcSgE"},
          {id:"js-e179", title:"جحيم الـ Callback Callback Hell (هرم العذاب)", duration:"6:24", type:"فيديو", videoUrl:"https://www.youtube.com/embed/vZjHCcZJMi4"},
          {id:"js-e180", title:"مقدمة Promise وصياغته", duration:"8:30", type:"فيديو", videoUrl:"https://www.youtube.com/embed/UXmqduAHxzY"},
          {id:"js-e181", title:"دوال Promise - Then و Catch و Finally", duration:"9:32", type:"فيديو", videoUrl:"https://www.youtube.com/embed/EOysmTtZzzc"},
          {id:"js-e182", title:"Promise مع XHR", duration:"5:09", type:"فيديو", videoUrl:"https://www.youtube.com/embed/QvzH9Y8dw2s"},
          {id:"js-e183", title:"واجهة Fetch API", duration:"5:56", type:"فيديو", videoUrl:"https://www.youtube.com/embed/oO0a7tQcGps"},
          {id:"js-e184", title:"Promise All و All Settled و Race", duration:"8:09", type:"فيديو", videoUrl:"https://www.youtube.com/embed/OipVzp0R7zs"},
          {id:"js-e185", title:"كلمة Async وتدريب", duration:"7:28", type:"فيديو", videoUrl:"https://www.youtube.com/embed/PI2zuNkELTs"},
          {id:"js-e186", title:"كلمة Await وتدريب", duration:"4:58", type:"فيديو", videoUrl:"https://www.youtube.com/embed/5iLxtN4POts"},
          {id:"js-e187", title:"Try و Catch و Finally مع Fetch", duration:"4:34", type:"فيديو", videoUrl:"https://www.youtube.com/embed/nb3Hh-gAbM4"},
          {id:"js-e188", title:"خاتمة الكورس ونصائح أخيرة", duration:"3:09", type:"فيديو", videoUrl:"https://www.youtube.com/embed/P2M11Inc6EM"},
          {id:"w10-project", title:"مشروع: أداة جلب مستودعات GitHub (Fetch API)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/uCKCSO8vkiU"}
        ]},
        { id:"module-d-intro", title:"🛠️ Module D: الأدوات الاحترافية (الأسابيع 11-13)", duration:"—", lessons:[
          {id:"module-d-note", title:"مقدمة Module D: SASS و Tooling و المشروع الختامي", duration:"", type:"قراءة", videoUrl:"https://sass-lang.com/"}
        ]},
        { id:"js-week11-sass", title:"الأسبوع 11: SASS (CSS Pre-processor)", duration:"أسبوع", lessons:[
          {id:"sass-w11-01", title:"كورس SASS بالعربي — Elzero (قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAzlPyLCtVVMNqaAFxCIY7ii"},
          {id:"sass-w11-02", title:"كورس SASS — Net Ninja (إنجليزي، قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PL4cUxeGkcC9jxJX7vojNVK-o8ubDZEcNb"},
          {id:"sass-w11-03", title:"كورس SASS المكثف — Traversy Media (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/nu5mdN2JIwM"},
          {id:"sass-w11-04", title:"مهمة: إعادة هيكلة CSS مشروع Netflix Clone إلى SASS", duration:"", type:"مشروع", videoUrl:"https://sass-lang.com/guide/"}
        ]},
        { id:"js-week12-tooling", title:"الأسبوع 12: الأدوات الاحترافية (NPM & Webpack)", duration:"أسبوع", lessons:[
          {id:"tooling-w12-01", title:"كورس NPM المكثف — Traversy Media", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/jHDhaSSKmB0"},
          {id:"tooling-w12-02", title:"كورس Webpack 5 المكثف — Traversy Media", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/IZGNcSuwBZs"},
          {id:"tooling-w12-03", title:"مهمة: تجهيز بيئة عمل محلية احترافية بسكريبتات جاهزة", duration:"", type:"مشروع", videoUrl:"https://docs.npmjs.com/cli/v10/using-npm/scripts"}
        ]},
        { id:"js-week13-capstone", title:"الأسبوع 13: المشروع الختامي (Capstone)", duration:"أسبوع", lessons:[
          {id:"capstone-w13-project", title:"المشروع الختامي: متجر إلكتروني كامل بالـ Vanilla JS", duration:"", type:"مشروع", videoUrl:"https://youtu.be/b3Gqq_k-g24"}
        ]},
        { id:"js-practice-elzero", title:"مشاريع تطبيقية: Elzero Web School", duration:"—", lessons:[
          {id:"jspp-elzero-01", title:"مشروع: سلايدر صور (Image Slider)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/QmPXb-RHy5s"},
          {id:"jspp-elzero-02", title:"مشروع: تطبيق To-Do بالـ LocalStorage", duration:"", type:"مشروع", videoUrl:"https://youtu.be/ylsFXMHpFUQ"},
          {id:"jspp-elzero-03", title:"مشروع: عداد تنازلي (Countdown Timer)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/eFsiOTJrrE8"},
          {id:"jspp-elzero-04", title:"مشروع: لعبة الذاكرة (Memory Game)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/KRj4DFBTBkA"},
          {id:"jspp-elzero-05", title:"مشروع: لعبة Hangman", duration:"", type:"مشروع", videoUrl:"https://youtu.be/ZFb_eaYtWwY"},
          {id:"jspp-elzero-06", title:"مشروع: أداة جلب مستودعات GitHub (Fetch API)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/uCKCSO8vkiU"},
          {id:"jspp-elzero-07", title:"مشروع: تطبيق اختبار (Quiz Application)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/T5QyLcmcMJ4"}
        ]},
        { id:"js-practice-unique-coderz", title:"مشاريع تطبيقية: Unique Coderz Academy", duration:"—", lessons:[
          {id:"jspp-unique-01", title:"قائمة تشغيل: مشاريع JS — Unique Coderz Academy", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLtFbQRDJ11kGlRWp8MFhqlbO3ZmxIa3RE"},
          {id:"jspp-unique-02", title:"مشروع: تطبيق وصفات طبخ (Recipe App)", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLtFbQRDJ11kEMjSzhHKMdcIuLiIywYWjH"},
          {id:"jspp-unique-03", title:"مشروع: نظام إدارة منتجات (CRUD)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/nJZAvdUhUMs"},
          {id:"jspp-unique-04", title:"مشروع: عربة تسوق متجر إلكتروني", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLtFbQRDJ11kHCgyFid3khHdOk0VEHiJ3e"}
        ]},
        { id:"js-practice-traversy-lama", title:"مشاريع تطبيقية: Traversy Media & Lama Dev", duration:"—", lessons:[
          {id:"jspp-traversy-01", title:"بناء 5 مشاريع (HTML/CSS/JS)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/JkeyKeK3V24"},
          {id:"jspp-traversy-02", title:"نسخة من صفحة Netflix", duration:"", type:"مشروع", videoUrl:"https://youtu.be/P7t13SGytRk"},
          {id:"jspp-traversy-03", title:"موقع أفلام (90 دقيقة)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/AOlkcLtyXkw"},
          {id:"jspp-traversy-04", title:"موقع متجر إلكتروني (E-Commerce)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/b3Gqq_k-g24"}
        ]},
        { id:"js-problem-solving", title:"حل المشكلات والخوارزميات", duration:"—", lessons:[
          {id:"ps-01", title:"JSchallenger — تحديات خاصة بالجافاسكريبت", duration:"", type:"قراءة", videoUrl:"https://www.jschallenger.com/"},
          {id:"ps-02", title:"FreeCodeCamp — خوارزميات وهياكل بيانات JS", duration:"", type:"قراءة", videoUrl:"https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"},
          {id:"ps-03", title:"خارطة طريق NeetCode لحل المشكلات", duration:"", type:"قراءة", videoUrl:"https://neetcode.io/roadmap"},
          {id:"ps-04", title:"LeetCode — ابدأ من السهل ثم المتوسط ثم الصعب", duration:"", type:"قراءة", videoUrl:"https://leetcode.com/"}
        ]},
        { id:"js-extra-resources", title:"موارد إضافية في JavaScript", duration:"—", lessons:[
          {id:"jsx-01", title:"Learn JavaScript (تفاعلي)", duration:"", type:"قراءة", videoUrl:"https://learnjavascript.online/"},
          {id:"jsx-02", title:"The Modern JS Tutorial — javascript.info", duration:"", type:"قراءة", videoUrl:"https://javascript.info/"},
          {id:"jsx-03", title:"قناة Traversy Media — كورسات مكثفة ومشاريع", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/@TraversyMedia"},
          {id:"jsx-04", title:"قناة Elzero Web School — كورسات عربية كاملة", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/@ElzeroWebSchool"},
          {id:"jsx-05", title:"قناة FreeCodeCamp — شروحات طويلة ومعمّقة", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/@freecodecamp"},
          {id:"jsx-06", title:"قناة Unique Coderz Academy — مشاريع JS بالعربي", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/@UniqueCoderzAcademy"},
          {id:"jsx-07", title:"كورس مدفوع (اختياري): The Complete JavaScript Course 2023 — Jonas Schmedtmann", duration:"", type:"قراءة", videoUrl:"https://www.udemy.com/course/the-complete-javascript-course/"},
          {id:"jsx-08", title:"أسئلة مقابلات JavaScript (GitHub)", duration:"", type:"قراءة", videoUrl:"https://github.com/FADL285/javascript-interview-questions"}
        ]},
        { id:"quiz-js", title:"🧪 اختبارات: JavaScript", duration:"—", quizCourse:true, lessons:[
          {id:"quiz-js-01",  title:"اختبار JavaScript: الأساسيات",       duration:"10 دقائق", videoUrl:"https://github.com/FADL285/javascript-interview-questions", type:"تدريب", quizData:{lang:"js",  topic:"js-basics", questions:[
            {q:"أي كلمة تُعرّف متغيراً لا يتغير؟",     opts:["var","let","const","static"],               ans:2,videoUrl:"https://github.com/FADL285/javascript-interview-questions"},
            {q:"ما ناتج typeof [] ؟",                    opts:["array","object","list","undefined"],         ans:1},
            {q:"كيف تطبع نص في console؟",               opts:["print()","console.log()","log()","write()"], ans:1},
            {q:"الفرق بين == و ===؟",                    opts:["لا فرق","=== يقارن القيمة فقط","=== يقارن القيمة والنوع","== أدق"],ans:2},
            {q:"ما ناتج 5 + '3' ؟",                     opts:["8","53","error","NaN"],                     ans:1}
          ]}},
          {id:"quiz-js-02",  title:"اختبار JavaScript: Arrays",           duration:"10 دقائق", videoUrl:"https://github.com/FADL285/javascript-interview-questions", type:"تدريب", quizData:{lang:"js",  topic:"js-arrays", questions:[
            {q:"كيف تضيف عنصر في نهاية مصفوفة؟",       opts:["arr.add()","arr.push()","arr.append()","arr.insert()"],ans:1,videoUrl:"https://github.com/FADL285/javascript-interview-questions"},
            {q:"كيف تحذف آخر عنصر من مصفوفة؟",         opts:["arr.remove()","arr.pop()","arr.delete()","arr.shift()"],ans:1},
            {q:"كيف تعرف عدد عناصر مصفوفة؟",           opts:["arr.size","arr.count","arr.length","arr.total"],ans:2},
            {q:"أي method يُنشئ مصفوفة جديدة بشروط؟",  opts:["forEach","map","filter","reduce"],           ans:2},
            {q:"كيف تحوّل مصفوفة لنص مفصول بفاصلة؟",  opts:["arr.join(',')","arr.toString(',')","arr.split(',')","arr.concat(',')"],ans:0}
          ]}},
          {id:"quiz-js-03",  title:"اختبار JavaScript: DOM",              duration:"10 دقائق", videoUrl:"https://github.com/FADL285/javascript-interview-questions", type:"تدريب", quizData:{lang:"js",  topic:"js-dom", questions:[
            {q:"كيف تختار عنصر بـ id؟",                 opts:["querySelector","getClass","getElementById","findById"],ans:2,videoUrl:"https://github.com/FADL285/javascript-interview-questions"},
            {q:"كيف تغير نص عنصر HTML؟",                opts:["el.text","el.innerHTML","el.value","el.textContent"],ans:3},
            {q:"كيف تضيف event listener لزر؟",          opts:["btn.onClick()","btn.addEvent()","btn.addEventListener('click',fn)","btn.on('click',fn)"],ans:2},
            {q:"كيف تضيف class لعنصر؟",                 opts:["el.class.add()","el.classList.add()","el.addclass()","el.className.push()"],ans:1},
            {q:"كيف تنشئ عنصر HTML جديد؟",              opts:["document.newElement()","document.createElement()","document.makeElement()","new Element()"],ans:1}
          ]}}
        ]},

        { id:"react-prerequisites", title:"🅰️ المتطلبات الأساسية قبل React", duration:"—", lessons:[
          {id:"react-prereq-note", title:"تأكد من إتقانك: أساسيات JS، الدوال العليا، Arrow Functions، ES6 Modules، Promises/Async، Destructuring، Classes، Spread Operator، NPM، أساسيات Webpack/Babel", duration:"", type:"قراءة", videoUrl:"https://react.dev/learn"}
        ]},
        { id:"react-core-learning-path", title:"1. أساسيات React (Core React)", duration:"—", lessons:[
          {id:"react-core-01", title:"التوثيق الرسمي — React.dev", duration:"", type:"قراءة", videoUrl:"https://react.dev/"},
          {id:"react-core-02", title:"Kimz Codes — الجزء 1: React Hooks", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=RgtTrM_sflo&list=PLejc1JbD4ZFSaQIFNstRIrbm_fqb12Q59"},
          {id:"react-core-03", title:"Kimz Codes — الجزء 2: دورة حياة المكوّن LifeCycle", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/playlist?list=PLejc1JbD4ZFQa9YDF5pzB4JFbJovh3TN9"},
          {id:"react-core-04", title:"Kimz Codes — الجزء 3: تحسين الأداء Performance", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=AZ41NpgebPA&list=PLejc1JbD4ZFTYdkjzqYBujf7UCVQyn_aq"},
          {id:"react-core-05", title:"Kimz Codes — الجزء 4: React المتقدم", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=aC9vgsUorPE&list=PLejc1JbD4ZFTiDCCVu_uCW0GXqyvhtbf8"},
          {id:"react-core-06", title:"كورس Code Zone بالعربي (قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLQtNtS-WfRa9LbmD8ON7rWhn-AtKTGdkn"},
          {id:"react-core-07", title:"كورس React — FreeCodeCamp (إنجليزي، 2022)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/bMknfKXIFA8"},
          {id:"react-core-08", title:"كورس مدفوع (اختياري ومُوصى به): The Ultimate React Course — Jonas Schmedtmann", duration:"", type:"قراءة", videoUrl:"https://www.udemy.com/course/the-ultimate-react-course/"},
          {id:"react-core-09", title:"كورس مدفوع (اختياري): React - The Complete Guide — Maximilian Schwarzmuller", duration:"", type:"قراءة", videoUrl:"https://www.udemy.com/course/react-the-complete-guide-incl-redux/"}
        ]},
        { id:"react-state-management", title:"2. إدارة الحالة (Redux Toolkit)", duration:"—", lessons:[
          {id:"redux-01", title:"التوثيق الرسمي لـ Redux", duration:"", type:"قراءة", videoUrl:"https://redux.js.org/"},
          {id:"redux-02", title:"Kimz Codes — Redux Toolkit", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLejc1JbD4ZFREfrBoSl8tjAPZOY6HNqZv"},
          {id:"redux-03", title:"Kimz Codes — بناء متجر كتب بـ Redux Toolkit", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLejc1JbD4ZFQFvS469VXyCPO_py_kvVD5"},
          {id:"redux-04", title:"Index Academy — Redux مع React", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLDQ11FgmbqQObr_XGBVQiRr89YitNq-zc"},
          {id:"redux-05", title:"كورس Redux — FreeCodeCamp (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/zrs7u6bdbUw"}
        ]},
        { id:"react-modern-styling", title:"3. التنسيق الحديث (Tailwind CSS)", duration:"—", lessons:[
          {id:"tw-01", title:"كورس Tailwind CSS المكثف — Ag Coding (قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLnD96kXp-_pMR9cBUmvsz_kIIt9bv2UIP"},
          {id:"tw-02", title:"تعلّم Tailwind في فيديو واحد — Termez Academy (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/Pk3hhCJG2Dk"},
          {id:"tw-03", title:"تدريب: بناء موقع نباتات متجاوب", duration:"", type:"مشروع", videoUrl:"https://youtu.be/zKguO4oaAGs"},
          {id:"tw-04", title:"تدريب: موقع كامل باستخدام Tailwind", duration:"", type:"مشروع", videoUrl:"https://youtu.be/9Px2cwdQ8PM"}
        ]},
        { id:"react-typescript-phase3", title:"4. TypeScript", duration:"—", lessons:[
          {id:"ts-note", title:"TypeScript إضافة طبقة Typing فوق JavaScript — يكتشف الأخطاء وقت الكتابة لا التشغيل، ومعيار أساسي في React/Angular الاحترافي", duration:"", type:"قراءة", videoUrl:"https://www.typescriptlang.org/"},
          {id:"ts-01", title:"Elzero — كورس TypeScript بالعربي", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=yUndnE-2osg&list=PLDoPjvoNmBAy532K9M_fjiAmrJ0gkCyLJ"},
          {id:"ts-02", title:"Net Ninja — كورس TypeScript (إنجليزي)", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=2pZmKW9-I_k&list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI"},
          {id:"ts-03", title:"كورس TypeScript مكثف لـ React/Next — Lama Dev", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/WlxcujsvcIY"},
          {id:"ts-04", title:"مشروع: متجر إلكتروني بـ React و TypeScript و Redux Toolkit", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLejc1JbD4ZFS4sEpIpLfD18FEnEpafVbz"}
        ]},
        { id:"react-nextjs-metaframework", title:"5. إطار العمل الفوقي (Next.js)", duration:"—", lessons:[
          {id:"next-note", title:"Next.js يضيف لـ React: التصيير على السيرفر SSR، تحسين SEO، وإمكانيات Fullstack", duration:"", type:"قراءة", videoUrl:"https://nextjs.org/"},
          {id:"next-01", title:"كورس Next.js الكامل — Termez Academy (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/_t4c-vxalp4"},
          {id:"next-02", title:"كورس Next.js 13 — Index Academy (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/KN66vLV0QZk"},
          {id:"next-03", title:"كورس Next.js 14 الكامل — JS Mastery (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/wm5gMKuwSYk"},
          {id:"next-04", title:"كورس مدفوع (اختياري ومُوصى به): Next.js — Stephen Grider", duration:"", type:"قراءة", videoUrl:"https://www.udemy.com/course/next-js-the-complete-developers-guide/"},
          {id:"next-05", title:"كورس مدفوع (اختياري): Next.js 14 & React — Maximilian Schwarzmuller", duration:"", type:"قراءة", videoUrl:"https://www.udemy.com/course/nextjs-react-the-complete-guide/"}
        ]},
        { id:"react-ecosystem-libraries", title:"مكتبات أساسية في عالم React", duration:"—", lessons:[
          {id:"relib-nav-01", title:"React Router — Codevolution (قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLC3y8-rFHvwjkxt8TOteFdT_YmzwpBlrG"},
          {id:"relib-nav-02", title:"React Router — شرح كامل", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/oTIJunBa6MA"},
          {id:"relib-ui-01", title:"كورس Material UI — Net Ninja (قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PL4cUxeGkcC9gjxLvV4VEkZ6H6H4yWuS58"},
          {id:"relib-ui-02", title:"كورس Shadcn UI — Net Ninja (قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PL4cUxeGkcC9h1NXLUuiAQ7c4UtdEInqma"},
          {id:"relib-fetch-01", title:"تعلّم React Query في 50 دقيقة", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/r8Dg0KVnfMA"},
          {id:"relib-fetch-02", title:"React Query — شرح كامل", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/8K1N3fE-cDs"},
          {id:"relib-form-01", title:"كورس React Hook Form المكثف (عربي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/8OO4xhJnniU"},
          {id:"relib-form-02", title:"تعلّم Zod في 30 دقيقة (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/L6BE-U3oy80"},
          {id:"relib-form-03", title:"React Hook Form + Zod — شرح كامل", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/cc_xmawJ8Kg"},
          {id:"relib-form-04", title:"قائمة تشغيل: تدريبات React Hook Form", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s"}
        ]},
        { id:"react-week1", title:"الأسبوع 1: التفكير بطريقة React", duration:"أسبوع", lessons:[
          {id:"rw1-concepts", title:"المفاهيم: Components, JSX, Props, State (useState), Effects (useEffect)", duration:"", type:"قراءة", videoUrl:"https://react.dev/learn/describing-the-ui"},
          {id:"rw1-task1", title:"مهمة 1: بناء بطاقة تويتر ثابتة (تمرير البيانات عبر Props)", duration:"", type:"مشروع", videoUrl:"https://react.dev/learn/passing-props-to-a-component"},
          {id:"rw1-task2", title:"مهمة 2: أكورديون تفاعلي (إظهار/إخفاء المحتوى بـ useState)", duration:"", type:"مشروع", videoUrl:"https://react.dev/reference/react/useState"}
        ]},
        { id:"react-week2", title:"الأسبوع 2: النماذج والتأثيرات الجانبية", duration:"أسبوع", lessons:[
          {id:"rw2-concepts", title:"المفاهيم: Controlled Components, useRef, تنظيف useEffect, Custom Hooks", duration:"", type:"قراءة", videoUrl:"https://react.dev/learn/managing-state"},
          {id:"rw2-task1", title:"مهمة 1: نموذج تسجيل بتحقق فوري وتعطيل زر الإرسال", duration:"", type:"مشروع", videoUrl:"https://react.dev/reference/react-dom/components/input"},
          {id:"rw2-task2", title:"مهمة 2: بناء Custom Hook باسم useWindowSize", duration:"", type:"مشروع", videoUrl:"https://react.dev/learn/reusing-logic-with-custom-hooks"}
        ]},
        { id:"react-week3", title:"الأسبوع 3: React المعتمد على البيانات (API & Routing)", duration:"أسبوع", lessons:[
          {id:"rw3-concepts", title:"المفاهيم: React Router v6، جلب البيانات، حالات التحميل والخطأ", duration:"", type:"قراءة", videoUrl:"https://reactrouter.com/en/main/start/tutorial"},
          {id:"rw3-task", title:"مهمة: تطبيق بحث أفلام عبر TMDB API بصفحتي Home وMovieDetail", duration:"", type:"مشروع", videoUrl:"https://reactrouter.com/en/main/start/tutorial"}
        ]},
        { id:"react-week4", title:"الأسبوع 4: الحالة العامة (Redux Toolkit)", duration:"أسبوع", lessons:[
          {id:"rw4-concepts", title:"المفاهيم: Store, Slices, Dispatch, Selectors", duration:"", type:"قراءة", videoUrl:"https://redux-toolkit.js.org/"},
          {id:"rw4-task", title:"مهمة: نظام عربة تسوق متجر إلكتروني مع حفظ بالـ LocalStorage وتحدي Undo", duration:"", type:"مشروع", videoUrl:"https://redux-toolkit.js.org/tutorials/quick-start"}
        ]},
        { id:"react-week5", title:"الأسبوع 5: أساسيات Next.js (App Router)", duration:"أسبوع", lessons:[
          {id:"rw5-concepts", title:"المفاهيم: Server vs Client Components، التوجيه بالملفات، Layouts", duration:"", type:"قراءة", videoUrl:"https://nextjs.org/learn"},
          {id:"rw5-task", title:"مهمة: مدونة بسيطة باستخدام ملفات Markdown كقاعدة بيانات (SSG)", duration:"", type:"مشروع", videoUrl:"https://nextjs.org/learn"}
        ]},
        { id:"react-week6", title:"الأسبوع 6: Server Actions وقواعد البيانات", duration:"أسبوع", lessons:[
          {id:"rw6-concepts", title:"المفاهيم: Server Actions، Prisma (ORM)، Supabase/PostgreSQL", duration:"", type:"قراءة", videoUrl:"https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations"},
          {id:"rw6-task", title:"مهمة: تطبيق Guestbook مع حفظ في قاعدة بيانات وتحديث فوري", duration:"", type:"مشروع", videoUrl:"https://www.prisma.io/docs"}
        ]},
        { id:"react-week7", title:"الأسبوع 7: المصادقة وتحسين الأداء", duration:"أسبوع", lessons:[
          {id:"rw7-concepts", title:"المفاهيم: NextAuth (Auth.js)، Middleware، تحسين الصور والخطوط", duration:"", type:"قراءة", videoUrl:"https://authjs.dev/"},
          {id:"rw7-task", title:"مهمة: لوحة تحكم محمية بتسجيل دخول GitHub وحماية المسار بـ Middleware", duration:"", type:"مشروع", videoUrl:"https://authjs.dev/getting-started/providers/github"}
        ]},
        { id:"react-week8", title:"الأسبوع 8: المشروع الختامي (Capstone)", duration:"أسبوع", lessons:[
          {id:"rw8-project", title:"مشروع ختامي: نظام تعليمي متكامل (LMS) — Next.js, Tailwind, Prisma, Stripe (تجريبي), Mux للفيديو. وضع المعلّم لإنشاء الكورسات، ووضع الطالب لمتابعة التقدّم", duration:"", type:"مشروع", videoUrl:"https://nextjs.org/learn"}
        ]},
        { id:"react-recommended-projects", title:"مشاريع موصى بها لكل المستويات", duration:"—", lessons:[
          {id:"rproj-beg-01", title:"مبتدئ: صفحة براند (Brand Page)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/W7up-w1QYpw"},
          {id:"rproj-beg-02", title:"مبتدئ: صفحة تواصل معنا (Contact Us)", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/watch?v=hrHIzqyq06U"},
          {id:"rproj-beg-03", title:"مبتدئ: موقع Foody Zone", duration:"", type:"مشروع", videoUrl:"https://youtu.be/i__4ul5yXFc"},
          {id:"rproj-beg-04", title:"مبتدئ: تطبيق مهام Todo App", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/watch?v=LoYbN6qoQHA"},
          {id:"rproj-int-01", title:"متوسط: تطبيق فواتير (Invoice App) بـ React", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLakmP0ibjfQcNNh7PnmIQ9zTm2bLM_wCC"},
          {id:"rproj-int-02", title:"متوسط: 25 مشروع React", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLJT9n0q3md18xl4PWqzqNFUEp9DbBmogZ"},
          {id:"rproj-adv-01", title:"متقدم: نسخ تطبيقات حقيقية (Netflix, Spotify..)", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP"}
        ]},
        { id:"react-youtube-channels", title:"قنوات يوتيوب موصى بها", duration:"—", lessons:[
          {id:"rch-01", title:"JavaScript Mastery — مشاريع React و Next.js", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/@javascriptmastery"},
          {id:"rch-02", title:"Traversy Media — كورسات مكثفة", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/@TraversyMedia"},
          {id:"rch-03", title:"Lama Dev — نسخ تطبيقات Fullstack", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/@LamaDev"},
          {id:"rch-04", title:"FreeCodeCamp — كورسات طويلة ومعمّقة", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/@freecodecamp"}
        ]},
        { id:"react-intro", title:"React.js الكورس الكامل - أكاديمية ترميز", duration:"5 أسابيع", lessons:[
          {id:"react-tarmeez-001",title:"كورس رياكت | React JS Course Intro",duration:"5:45",type:"فيديو",videoUrl:"https://www.youtube.com/embed/ihRRf3EjTV8"},
          {id:"react-tarmeez-002",title:"هدية رمضان؟ ما الجديد بخصوص كورس رياكت React JS؟",duration:"4:21",type:"فيديو",videoUrl:"https://www.youtube.com/embed/VEk68iGckKI"},
          {id:"react-tarmeez-003",title:"1: عن كورس رياكت | المتطلبات | طريقة التعلم | about React course",duration:"5:30",type:"فيديو",videoUrl:"https://www.youtube.com/embed/T9DTxrQ1BU0"},
          {id:"react-tarmeez-004",title:"1.5: كيف تحصل على كل أكواد الكورس من github",duration:"9:45",type:"فيديو",videoUrl:"https://www.youtube.com/embed/xa2TMZCy83g"},
          {id:"react-tarmeez-005",title:"1.6: الحصول على الأكواد و التعامل معها باستخدام git",duration:"5:41",type:"فيديو",videoUrl:"https://www.youtube.com/embed/UYLS4yR9rA4"},
          {id:"react-tarmeez-006",title:"2: ما هو رياكت ؟ | What is React JS",duration:"8:27",type:"فيديو",videoUrl:"https://www.youtube.com/embed/aI_fsq7E2w8"},
          {id:"react-tarmeez-007",title:"3: التجربة الأولى ل React",duration:"9:16",type:"فيديو",videoUrl:"https://www.youtube.com/embed/gIrYp2rIL8g"},
          {id:"react-tarmeez-008",title:"4: تجهيز بيئة العمل و إنشاء مشروع React جديد",duration:"10:50",type:"مشروع",videoUrl:"https://www.youtube.com/embed/UL3Qt2ekPqg"},
          {id:"react-tarmeez-009",title:"5: فهم هيكلة مشاريع React",duration:"14:02",type:"فيديو",videoUrl:"https://www.youtube.com/embed/WkZ8PJXgWA4"},
          {id:"react-tarmeez-010",title:"6: بناء ال component الأول في React",duration:"17:46",type:"فيديو",videoUrl:"https://www.youtube.com/embed/fTIBV31mwcs"},
          {id:"react-tarmeez-011",title:"7: ما هو ال component في React؟ | شرح نظري",duration:"5:46",type:"فيديو",videoUrl:"https://www.youtube.com/embed/Gtmtx1e6uig"},
          {id:"react-tarmeez-012",title:"8: مقدمة إلى ال JSX",duration:"11:06",type:"فيديو",videoUrl:"https://www.youtube.com/embed/IwF20A3LbJs"},
          {id:"react-tarmeez-013",title:"9: إضافة Style لعناصر ال JSX",duration:"10:20",type:"فيديو",videoUrl:"https://www.youtube.com/embed/Mk_9Kwpko5M"},
          {id:"react-tarmeez-014",title:"10: إضافة ال Classes في ال JSX",duration:"12:00",type:"فيديو",videoUrl:"https://www.youtube.com/embed/O6wQgtk4VEk"},
          {id:"react-tarmeez-015",title:"11: تحدي بناء ال Components",duration:"3:37",type:"تدريب",videoUrl:"https://www.youtube.com/embed/80s3Rp64n5o"},
          {id:"react-tarmeez-016",title:"12: حل تحدي ال Components في React",duration:"28:41",type:"تدريب",videoUrl:"https://www.youtube.com/embed/xiku8FD-z_E"},
          {id:"react-tarmeez-017",title:"13: إرسال ال props في ال Components",duration:"19:07",type:"فيديو",videoUrl:"https://www.youtube.com/embed/QvPgLBCQRPs"},
          {id:"react-tarmeez-018",title:"14: إرسال ال JSX كـ Props إلى ال Component",duration:"14:03",type:"فيديو",videoUrl:"https://www.youtube.com/embed/CyhC7NkTNRk"},
          {id:"react-tarmeez-019",title:"15: تحدي ال Props",duration:"1:53",type:"تدريب",videoUrl:"https://www.youtube.com/embed/VMqd4ce1qW0"},
          {id:"react-tarmeez-020",title:"16: حل تحدي ال Props",duration:"10:41",type:"تدريب",videoUrl:"https://www.youtube.com/embed/dvLhAv3qdPY"},
          {id:"react-tarmeez-021",title:"17: Conditional Rendering in React",duration:"12:20",type:"فيديو",videoUrl:"https://www.youtube.com/embed/Z1L3QonlPNk"},
          {id:"react-tarmeez-022",title:"18: Rendering List in React",duration:"15:22",type:"فيديو",videoUrl:"https://www.youtube.com/embed/tKw2l3ds1qk"},
          {id:"react-tarmeez-023",title:"19: تحدي ال List Rendering",duration:"1:53",type:"تدريب",videoUrl:"https://www.youtube.com/embed/Lf24mX7WJu4"},
          {id:"react-tarmeez-024",title:"20: حل تحدي ال List Rendering",duration:"15:40",type:"تدريب",videoUrl:"https://www.youtube.com/embed/z4Du5I_ziS0"},
          {id:"react-tarmeez-025",title:"21: مقدمة إلى ال State في رياكت | Intro to State in React",duration:"8:19",type:"فيديو",videoUrl:"https://www.youtube.com/embed/rnVI3UKcKQA"},
          {id:"react-tarmeez-026",title:"22: مشكلة تعديل ال State من ال Component",duration:"6:19",type:"فيديو",videoUrl:"https://www.youtube.com/embed/CdmgBbZt98Q"},
          {id:"react-tarmeez-027",title:"23: ما هو ال React DOM و كيف يعمل؟",duration:"8:21",type:"فيديو",videoUrl:"https://www.youtube.com/embed/WjjBGKZTmGA"},
          {id:"react-tarmeez-028",title:"24: useState Hook in React",duration:"18:39",type:"فيديو",videoUrl:"https://www.youtube.com/embed/uaCKeDbPagI"},
          {id:"react-tarmeez-029",title:"25: إدارة ال State مع المدخلات | Managing State with Input in React",duration:"13:58",type:"فيديو",videoUrl:"https://www.youtube.com/embed/E8XtEW9VtAQ"},
          {id:"react-tarmeez-030",title:"26: State with Forms in React",duration:"17:54",type:"فيديو",videoUrl:"https://www.youtube.com/embed/O5XukD0QleM"},
          {id:"react-tarmeez-031",title:"27: حل مشكلة ال Object State في ال Form",duration:"13:59",type:"فيديو",videoUrl:"https://www.youtube.com/embed/xQVe6UdQ0Mo"},
          {id:"react-tarmeez-032",title:"28: Other Form Fields with State",duration:"16:18",type:"فيديو",videoUrl:"https://www.youtube.com/embed/e9jC-ksQNZs"},
          {id:"react-tarmeez-033",title:"29: Select & Radio Inputs with State",duration:"10:39",type:"فيديو",videoUrl:"https://www.youtube.com/embed/Fzybs7igHJI"},
          {id:"react-tarmeez-034",title:"30: تحدي تحديث ال State Object",duration:"4:23",type:"تدريب",videoUrl:"https://www.youtube.com/embed/-UnKqhBV-jM"},
          {id:"react-tarmeez-035",title:"31: حل تحدي تحديث ال Object State",duration:"10:27",type:"تدريب",videoUrl:"https://www.youtube.com/embed/tQAQ22DaHEw"},
          {id:"react-tarmeez-036",title:"32: Using Arrays as State in the Component in React JS",duration:"17:22",type:"فيديو",videoUrl:"https://www.youtube.com/embed/HS9ntQK1L9U"},
          {id:"react-tarmeez-037",title:"33: التعديل و الحذف في ال Array State في رياكت",duration:"17:26",type:"فيديو",videoUrl:"https://www.youtube.com/embed/2JnqwotmWlA"},
          {id:"react-tarmeez-038",title:"34: التعديل في ال Array State",duration:"9:42",type:"فيديو",videoUrl:"https://www.youtube.com/embed/IwUhL2k5lBo"},
          {id:"react-tarmeez-039",title:"35: تحدي تحديث ال Array State",duration:"2:07",type:"تدريب",videoUrl:"https://www.youtube.com/embed/Be-EcE1HGMQ"},
          {id:"react-tarmeez-040",title:"36: حل تحدي تحديث ال Array State",duration:"14:03",type:"تدريب",videoUrl:"https://www.youtube.com/embed/u3QUWQ9SR7s"},
          {id:"react-tarmeez-041",title:"37: التحديث المتكرر لل state في رياكت",duration:"15:05",type:"تدريب",videoUrl:"https://www.youtube.com/embed/YBcpuSw2puE"},
          {id:"react-tarmeez-042",title:"38: تحدي التحديث المتتالي لل State",duration:"3:22",type:"تدريب",videoUrl:"https://www.youtube.com/embed/w0kMLyQAYlM"},
          {id:"react-tarmeez-043",title:"39: حل تحدي التحديث المتتالي لل State",duration:"5:22",type:"تدريب",videoUrl:"https://www.youtube.com/embed/RxoJ8Lziy3Y"},
          {id:"react-tarmeez-044",title:"40: عرض مشروع Loan Application Form",duration:"6:00",type:"مشروع",videoUrl:"https://www.youtube.com/embed/_OKFG5QRKRk"},
          {id:"react-tarmeez-045",title:"41: المشروع الأول: بناء الواجهات و ال Components",duration:"35:07",type:"مشروع",videoUrl:"https://www.youtube.com/embed/hFrOluMFZxA"},
          {id:"react-tarmeez-046",title:"42: المشروع الأول: بناء المنطق البرمجي",duration:"38:22",type:"مشروع",videoUrl:"https://www.youtube.com/embed/XMV0efl8PcE"},
          {id:"react-tarmeez-047",title:"المشروع الأول: إظهار ال Modal و إكمال المشروع",duration:"28:05",type:"مشروع",videoUrl:"https://www.youtube.com/embed/soylbvulfL0"},
          {id:"react-tarmeez-048",title:"44: Communication using (Props)",duration:"15:46",type:"فيديو",videoUrl:"https://www.youtube.com/embed/nalt9TkgOlE"},
          {id:"react-tarmeez-049",title:"45: Sending the event handler to the props",duration:"12:30",type:"فيديو",videoUrl:"https://www.youtube.com/embed/0v98acMR83s"},
          {id:"react-tarmeez-050",title:"47: Prop Drilling Issue",duration:"11:20",type:"فيديو",videoUrl:"https://www.youtube.com/embed/xHa7n-VQtrs"},
          {id:"react-tarmeez-051",title:"48 : Using (useContext) to Fix The Prop Drilling Issue",duration:"23:48",type:"فيديو",videoUrl:"https://www.youtube.com/embed/I9e3N1Oo41o"},
          {id:"react-tarmeez-052",title:"49: Using (useContext) to Share Data in The APP",duration:"14:27",type:"فيديو",videoUrl:"https://www.youtube.com/embed/SG0y0ooz_7c"},
          {id:"react-tarmeez-053",title:"50 : Context Challenge",duration:"3:45",type:"فيديو",videoUrl:"https://www.youtube.com/embed/FOcRjUtN57A"},
          {id:"react-tarmeez-054",title:"51 : Context Challenge Solution",duration:"11:41",type:"فيديو",videoUrl:"https://www.youtube.com/embed/MQ5lV4T_FxY"},
          {id:"react-tarmeez-055",title:"52 : Intro To React Router",duration:"17:33",type:"فيديو",videoUrl:"https://www.youtube.com/embed/bkj8obp1XmA"},
          {id:"react-tarmeez-056",title:"53 : Using (Link) To Navigate To Other Pages",duration:"9:49",type:"فيديو",videoUrl:"https://www.youtube.com/embed/5MaixzjGp7Q"},
          {id:"react-tarmeez-057",title:"54 : Dynamic Routes",duration:"19:57",type:"فيديو",videoUrl:"https://www.youtube.com/embed/PygnQV9uPUM"},
          {id:"react-tarmeez-058",title:"55 : Extracting Params From The Dynamic Routes",duration:"12:41",type:"فيديو",videoUrl:"https://www.youtube.com/embed/L5jsXplAZzM"},
          {id:"react-tarmeez-059",title:"56 : 404 page إظهار صفحة الخطأ",duration:"9:53",type:"فيديو",videoUrl:"https://www.youtube.com/embed/JtYg5b0Trf4"},
          {id:"react-tarmeez-060",title:"57 : Nested Routes - الروابط المتداخلة",duration:"11:41",type:"فيديو",videoUrl:"https://www.youtube.com/embed/G-PfDshO8nY"},
          {id:"react-tarmeez-061",title:"58 : SSR vs CSR - SPA? ما هي مواقع الصفحة الواحدة؟",duration:"8:59",type:"فيديو",videoUrl:"https://www.youtube.com/embed/2X7PvnYhDUc"},
          {id:"react-tarmeez-062",title:"59 : البدء في استخدام أطر العمل التصميمية في رياكت",duration:"17:37",type:"فيديو",videoUrl:"https://www.youtube.com/embed/qwtcYDWf1EU"},
          {id:"react-tarmeez-063",title:"60 : تخصيص التصميم الكلي للمشروع",duration:"10:36",type:"مشروع",videoUrl:"https://www.youtube.com/embed/44dWRBXH5sI"},
          {id:"react-tarmeez-064",title:"61 :  Material UI تخصيص و ترتيب الصفحة في",duration:"10:45",type:"فيديو",videoUrl:"https://www.youtube.com/embed/7b_5F4Omlcw"},
          {id:"react-tarmeez-065",title:"62 : icons استخدام ال",duration:"6:00",type:"فيديو",videoUrl:"https://www.youtube.com/embed/QW4Q1SifYHs"},
          {id:"react-tarmeez-066",title:"63 : Material UI تحدي الـ",duration:"1:47",type:"تدريب",videoUrl:"https://www.youtube.com/embed/4hqkjobgJ_M"},
          {id:"react-tarmeez-067",title:"64 : Material UI حل تحدي الـ",duration:"10:10",type:"تدريب",videoUrl:"https://www.youtube.com/embed/HTCGjyzlPU0"},
          {id:"react-tarmeez-068",title:"65 : مقدمة لمشروع قائمة المهام",duration:"6:19",type:"مشروع",videoUrl:"https://www.youtube.com/embed/nRsXnEIyPog"},
          {id:"react-tarmeez-069",title:"66 :  استعراض مشروع قائمة المهام",duration:"4:01",type:"مشروع",videoUrl:"https://www.youtube.com/embed/zbTBkOEktb8"},
          {id:"react-tarmeez-070",title:"67 : تنزيل المكتبات و البدء في المشروع",duration:"6:22",type:"مشروع",videoUrl:"https://www.youtube.com/embed/r6ovmDUjuf0"},
          {id:"react-tarmeez-071",title:"68 :  Todo List تصميم الهيكل العام لل",duration:"16:17",type:"فيديو",videoUrl:"https://www.youtube.com/embed/6ef5_N3znBY"},
          {id:"react-tarmeez-072",title:"69 : Todo Component بناء الـ",duration:"14:44",type:"فيديو",videoUrl:"https://www.youtube.com/embed/wuUzvpqLhvw"},
          {id:"react-tarmeez-073",title:"70 : Todo Component إكمال بناء ال",duration:"7:55",type:"فيديو",videoUrl:"https://www.youtube.com/embed/qjGA5jIdlGw"},
          {id:"react-tarmeez-074",title:"71 :  إضافة خطوط خارجية للمشروع",duration:"19:51",type:"مشروع",videoUrl:"https://www.youtube.com/embed/K7jdM9UWAzY"},
          {id:"react-tarmeez-075",title:"72 : إكمال التصميم الخاص بإضافة مهمة جديدة",duration:"8:33",type:"فيديو",videoUrl:"https://www.youtube.com/embed/fHI1z-32BhQ"},
          {id:"react-tarmeez-076",title:"73 : في قائمة المهام Todos إظهار مجموعة",duration:"8:31",type:"فيديو",videoUrl:"https://www.youtube.com/embed/GMILX5E1iS0"},
          {id:"react-tarmeez-077",title:"74 :  إضافة مهمة جديدة",duration:"9:06",type:"فيديو",videoUrl:"https://www.youtube.com/embed/WCRtvBfsLJM"},
          {id:"react-tarmeez-078",title:"75 :  إضافة مهمة للمهام المنجزة",duration:"21:08",type:"فيديو",videoUrl:"https://www.youtube.com/embed/mVc4DZxPZuM"},
          {id:"react-tarmeez-079",title:"76 : Context (useContext hook) الاعتماد على ال",duration:"12:21",type:"فيديو",videoUrl:"https://www.youtube.com/embed/yQl6i3DlRc0"},
          {id:"react-tarmeez-080",title:"77 :  حذف المهام من قائمة المهام",duration:"19:10",type:"فيديو",videoUrl:"https://www.youtube.com/embed/sa38_UaVdKM"},
          {id:"react-tarmeez-081",title:"78 : تعديل مهمة في قائمة المهام",duration:"21:14",type:"فيديو",videoUrl:"https://www.youtube.com/embed/W97AdKg8OY4"},
          {id:"react-tarmeez-082",title:"79 : localStorage تخزين المهام في ال",duration:"14:52",type:"فيديو",videoUrl:"https://www.youtube.com/embed/_su8JJzoYyI"},
          {id:"react-tarmeez-083",title:"80 : useEffect in React and how to retrieve data from localStorage",duration:"13:26",type:"فيديو",videoUrl:"https://www.youtube.com/embed/dU_mmTArv4g"},
          {id:"react-tarmeez-084",title:"81 :  Retrieving The Todos From Local Storage",duration:"7:59",type:"فيديو",videoUrl:"https://www.youtube.com/embed/cMzeJhaZZ8Y"},
          {id:"react-tarmeez-085",title:"82 : تصنيف المهام المنجزة / غيرالمنجزة",duration:"18:20",type:"فيديو",videoUrl:"https://www.youtube.com/embed/zMtcdkOkJ8k"},
          {id:"react-tarmeez-086",title:"83 : إضافة اللمسات الأخيرة على المشروع",duration:"10:03",type:"مشروع",videoUrl:"https://www.youtube.com/embed/Y2SnCMbNLsY"},
          {id:"react-tarmeez-087",title:"84 : Project Deployment - رفع المشروع",duration:"11:26",type:"مشروع",videoUrl:"https://www.youtube.com/embed/kdr795OPKYI"},
          {id:"react-tarmeez-088",title:"85 : مقدمة لتنظيف أكواد المشروع",duration:"3:42",type:"مشروع",videoUrl:"https://www.youtube.com/embed/xBJBfWUGB_g"},
          {id:"react-tarmeez-089",title:"86 : Caching The Computations Using useMemo",duration:"15:54",type:"فيديو",videoUrl:"https://www.youtube.com/embed/5xWJIRJDQXM"},
          {id:"react-tarmeez-090",title:"87 :  Moving The Dialog Modals Up (lifting the state up)",duration:"29:56",type:"فيديو",videoUrl:"https://www.youtube.com/embed/V1irnksyfXE"},
          {id:"react-tarmeez-091",title:"88 :  Adding Toast as Providers",duration:"10:36",type:"فيديو",videoUrl:"https://www.youtube.com/embed/SMoqtNpxAUI"},
          {id:"react-tarmeez-092",title:"89 : Adding Toast Logic With Context",duration:"15:15",type:"فيديو",videoUrl:"https://www.youtube.com/embed/-p4itIV9_qI"},
          {id:"react-tarmeez-093",title:"90 : Turning The Context Into Provider",duration:"26:07",type:"فيديو",videoUrl:"https://www.youtube.com/embed/yCgS0d4pQCA"},
          {id:"react-tarmeez-094",title:"90.1 : تصحيح كود الدرس الأخير",duration:"3:31",type:"فيديو",videoUrl:"https://www.youtube.com/embed/RDFIwyhc_Ns"},
          {id:"react-tarmeez-095",title:"91 :  Introduction To Use Reducer",duration:"36:35",type:"فيديو",videoUrl:"https://www.youtube.com/embed/_IOM9XtJAvE"},
          {id:"react-tarmeez-096",title:"92 :  Applying useReducers to Todo App",duration:"24:04",type:"فيديو",videoUrl:"https://www.youtube.com/embed/lMnahk7dXwQ"},
          {id:"react-tarmeez-097",title:"93 : Applying useReducer on Update / Delete",duration:"19:36",type:"فيديو",videoUrl:"https://www.youtube.com/embed/Qfl_YjygFZo"},
          {id:"react-tarmeez-098",title:"94 : Combining Reducer With Context",duration:"25:53",type:"فيديو",videoUrl:"https://www.youtube.com/embed/9ZNH6LMXlGc"},
          {id:"react-tarmeez-099",title:"95 :  Fixing The Mutation Problem",duration:"10:15",type:"فيديو",videoUrl:"https://www.youtube.com/embed/XuWDc8F4kq8"},
          {id:"react-tarmeez-100",title:"96 :  useState - useEffect - useMemo - useContext - useReducer مراجعة عامة",duration:"21:42",type:"فيديو",videoUrl:"https://www.youtube.com/embed/p9EIedN8c-M"},
          {id:"react-tarmeez-101",title:"96 :  useState - useEffect - useMemo - useContext - useReducer مراجعة عامة",duration:"4:12",type:"فيديو",videoUrl:"https://www.youtube.com/embed/5jH1yIgdhAM"},
          {id:"react-tarmeez-102",title:"97 :  API Section مقدمة إلى ال",duration:"2:43",type:"فيديو",videoUrl:"https://www.youtube.com/embed/EJ7-xQ1l5-c"},
          {id:"react-tarmeez-103",title:"98 : استعراض مشروع الطقس",duration:"3:40",type:"مشروع",videoUrl:"https://www.youtube.com/embed/5ze5E0Rllzg"},
          {id:"react-tarmeez-104",title:"99 :  تنزيل المكتبات و الخطوط",duration:"12:46",type:"فيديو",videoUrl:"https://www.youtube.com/embed/qre72_XkNHw"},
          {id:"react-tarmeez-105",title:"100 : بناء الواجهات",duration:"30:07",type:"فيديو",videoUrl:"https://www.youtube.com/embed/tgmW4qQofYA"},
          {id:"react-tarmeez-106",title:"101 : و فهمه api استعراض ال",duration:"9:24",type:"فيديو",videoUrl:"https://www.youtube.com/embed/vpDuYcwwyuk"},
          {id:"react-tarmeez-107",title:"102 : API Request in React",duration:"12:56",type:"فيديو",videoUrl:"https://www.youtube.com/embed/9WTg3IJ90a8"},
          {id:"react-tarmeez-108",title:"103 : useEffect Cleanup",duration:"18:12",type:"فيديو",videoUrl:"https://www.youtube.com/embed/aWYVnosjJoE"},
          {id:"react-tarmeez-109",title:"104 :  في الصفحة API تعبئة بيانات ال",duration:"12:16",type:"فيديو",videoUrl:"https://www.youtube.com/embed/gysbTkXLVHc"},
          {id:"react-tarmeez-110",title:"105 : using moment library for data and time",duration:"7:25",type:"فيديو",videoUrl:"https://www.youtube.com/embed/0R1ZLr_dH5M"},
          {id:"react-tarmeez-111",title:"106 : translation using i18next in react",duration:"12:36",type:"فيديو",videoUrl:"https://www.youtube.com/embed/gAIEDrZ_n90"},
          {id:"react-tarmeez-112",title:"107 :  تغيير اللغة من خلال الضغط على الزر",duration:"12:15",type:"فيديو",videoUrl:"https://www.youtube.com/embed/QKdiqHrNVpM"},
          {id:"react-tarmeez-113",title:"108 : تغيير اتجاه الموقع بناء على اللغة المحددة",duration:"5:26",type:"فيديو",videoUrl:"https://www.youtube.com/embed/OZYhnmBYCEM"},
          {id:"react-tarmeez-114",title:"109 : اختتام و رفع المشروع",duration:"5:38",type:"مشروع",videoUrl:"https://www.youtube.com/embed/wJwoQ6Uht4Y"},
          {id:"react-tarmeez-115",title:"110 : Redux مقدمة إلى فصل",duration:"4:49",type:"فيديو",videoUrl:"https://www.youtube.com/embed/7bPnRc_BDe8"},
          {id:"react-tarmeez-116",title:"111 : Redux - شرح نظري",duration:"14:32",type:"فيديو",videoUrl:"https://www.youtube.com/embed/skPHio9o5hk"},
          {id:"react-tarmeez-117",title:"112 : Redux with React البدء باستخدام",duration:"45:51",type:"فيديو",videoUrl:"https://www.youtube.com/embed/0Of7lSY83lE"},
          {id:"react-tarmeez-118",title:"113 : Using Redux for Subtraction",duration:"9:33",type:"فيديو",videoUrl:"https://www.youtube.com/embed/boRjfxexp64"},
          {id:"react-tarmeez-119",title:"114 : . مطابقة الشرح النظري و التطبيق العملي",duration:"12:32",type:"فيديو",videoUrl:"https://www.youtube.com/embed/lF6htJFAeNc"},
          {id:"react-tarmeez-120",title:"115 :  Redux تحدي",duration:"1:23",type:"تدريب",videoUrl:"https://www.youtube.com/embed/4H1r_ReqRN0"},
          {id:"react-tarmeez-121",title:"116 :  Redux حل تحدي",duration:"4:00",type:"تدريب",videoUrl:"https://www.youtube.com/embed/0uyxrmyr2xw"},
          {id:"react-tarmeez-122",title:"117 : Redux Dev Tool",duration:"8:34",type:"فيديو",videoUrl:"https://www.youtube.com/embed/AmgXhXCzZNk"},
          {id:"react-tarmeez-123",title:"118 : The Problem of Async Logic in Redux",duration:"12:43",type:"فيديو",videoUrl:"https://www.youtube.com/embed/NsbfiLVcL0Y"},
          {id:"react-tarmeez-124",title:"119 : Async Logic in Redux - شرح نظري",duration:"4:36",type:"فيديو",videoUrl:"https://www.youtube.com/embed/C5fTmbgGfRM"},
          {id:"react-tarmeez-125",title:"120 : Using Redux with API",duration:"16:40",type:"فيديو",videoUrl:"https://www.youtube.com/embed/HcSoYjkm8Ec"},
          {id:"react-tarmeez-126",title:"121 : Adding the Async Logic to Redux",duration:"13:44",type:"فيديو",videoUrl:"https://www.youtube.com/embed/VyB3wIx3AB0"},
          {id:"react-tarmeez-127",title:"122 : Adding Async Logic to the Redux Code",duration:"25:00",type:"فيديو",videoUrl:"https://www.youtube.com/embed/iK4hIf3K3YY"},
          {id:"react-tarmeez-128",title:"123 : Completing the Integration with Redux",duration:"12:03",type:"فيديو",videoUrl:"https://www.youtube.com/embed/5qARIq8q3fM"},
          {id:"react-tarmeez-129",title:"124 : Redux & Async Logic with Redux Revision",duration:"18:20",type:"فيديو",videoUrl:"https://www.youtube.com/embed/OKpp8f01-GQ"},
          {id:"react-tarmeez-130",title:"خاتمة السلسلة | ماذا بعد رياكت؟",duration:"5:32",type:"فيديو",videoUrl:"https://www.youtube.com/embed/nvAdERqTyWY"}]},

        { id:"vue-fundamentals", title:"💚 1. أساسيات Vue", duration:"—", lessons:[
          {id:"vue-f-note", title:"المفاهيم الأساسية: Directives, Reactivity, Components", duration:"", type:"قراءة", videoUrl:"https://vuejs.org/guide/introduction.html"},
          {id:"vue-f-01", title:"التوثيق الرسمي — Vue.js Guide", duration:"", type:"قراءة", videoUrl:"https://vuejs.org/guide/introduction.html"},
          {id:"vue-f-02", title:"كورس Vue.js المكثف (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/YrxBCBibVo0"},
          {id:"vue-f-03", title:"كورس Vue للمبتدئين (عربي) — Elzero", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAxr5AqK3Yz4DWYKVSmIFziw"}
        ]},
        { id:"vue-v3-features", title:"2. ميزات Vue 3", duration:"—", lessons:[
          {id:"vue3-note", title:"التركيز على: Composition API, Teleport, Fragments", duration:"", type:"قراءة", videoUrl:"https://vuejs.org/guide/extras/composition-api-faq.html"},
          {id:"vue3-01", title:"ما الجديد في Vue 3؟", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/bwItFdPt-6M"},
          {id:"vue3-02", title:"ميزات Vue 3 الجديدة (عربي)", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/playlist?list=PLLXntwspGdhCrdh_7xqzz0s3sH4sWlEiQ"}
        ]},
        { id:"vue-state-management", title:"3. إدارة الحالة (Pinia)", duration:"—", lessons:[
          {id:"pinia-note", title:"Pinia هي الخليفة الحديثة لـ Vuex — بسيطة وتدعم Type-safety", duration:"", type:"قراءة", videoUrl:"https://pinia.vuejs.org/"},
          {id:"pinia-01", title:"التوثيق الرسمي لـ Pinia", duration:"", type:"قراءة", videoUrl:"https://pinia.vuejs.org/"},
          {id:"pinia-02", title:"كورس Pinia — Net Ninja (قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/playlist?list=PL4cUxeGkcC9hp28dYyYBy3xoOdoeNw-hD"},
          {id:"pinia-03", title:"شرح Pinia (عربي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/IwNyiqUQa-8"}
        ]},
        { id:"vue-nuxt-metaframework", title:"4. إطار العمل الفوقي (Nuxt.js)", duration:"—", lessons:[
          {id:"nuxt-note", title:"لماذا Nuxt؟ التصيير على السيرفر (SSR) وتوليد الصفحات الثابتة (SSG)", duration:"", type:"قراءة", videoUrl:"https://nuxt.com/"},
          {id:"nuxt-01", title:"التوثيق الرسمي لـ Nuxt.js", duration:"", type:"قراءة", videoUrl:"https://nuxt.com/"}
        ]},
        { id:"vue-ecosystem-tools", title:"🛠️ أدوات ومنظومة Vue", duration:"—", lessons:[
          {id:"vuetool-01", title:"Tailwind CSS — إطار تنسيق Utility-First", duration:"", type:"قراءة", videoUrl:"https://tailwindcss.com/"},
          {id:"vuetool-02", title:"DaisyUI — مكتبة مكوّنات فوق Tailwind", duration:"", type:"قراءة", videoUrl:"https://daisyui.com/"},
          {id:"vuetool-03", title:"Axios — عميل HTTP قياسي", duration:"", type:"قراءة", videoUrl:"https://axios-http.com/"},
          {id:"vuetool-04", title:"TanStack Query — تخزين مؤقت ومزامنة بيانات السيرفر", duration:"", type:"قراءة", videoUrl:"https://tanstack.com/query/latest"},
          {id:"vuetool-05", title:"Vitest — اختبارات وحدة سريعة (Vite-native)", duration:"", type:"قراءة", videoUrl:"https://vitest.dev/"}
        ]},
        { id:"vue-projects-to-build", title:"🚀 مشاريع للتطبيق", duration:"—", lessons:[
          {id:"vueproj-01", title:"تطبيق Todo App (باستخدام Pinia)", duration:"", type:"قراءة", videoUrl:"https://vuejs.org/tutorial/"},
          {id:"vueproj-02", title:"لوحة عرض حالة الطقس (Weather Dashboard) عبر API", duration:"", type:"قراءة", videoUrl:"https://vuejs.org/guide/scaling-up/sfc.html"},
          {id:"vueproj-03", title:"كتالوج متجر إلكتروني (E-Commerce Catalog)", duration:"", type:"قراءة", videoUrl:"https://vuejs.org/guide/scaling-up/state-management.html"},
          {id:"vueproj-04", title:"تطبيق محادثة لحظية (Real-time Chat App)", duration:"", type:"قراءة", videoUrl:"https://vuejs.org/guide/scaling-up/ssr.html"}
        ]},
        { id:"vue-credits", title:"✍️ شكر وتقدير", duration:"—", lessons:[
          {id:"vue-credit-01", title:"Ameen Mohamed — المساهم في خارطة طريق Vue.js", duration:"", type:"قراءة", videoUrl:"https://vuejs.org/"}
        ]},
        { id:"angular-prerequisites", title:"🅰️ 1. المتطلبات الأساسية", duration:"—", lessons:[
          {id:"ang-prereq-01", title:"TypeScript: Interfaces, Types, Classes, Generics", duration:"", type:"قراءة", videoUrl:"https://www.typescriptlang.org/docs/handbook/2/generics.html"},
          {id:"ang-prereq-02", title:"RxJS: فهم أساسي لـ Observables, Subjects, Operators", duration:"", type:"قراءة", videoUrl:"https://rxjs.dev/guide/overview"}
        ]},
        { id:"angular-core-learning-path", title:"2. أساسيات Angular", duration:"—", lessons:[
          {id:"ang-core-note", title:"المفاهيم: Modules, Components, Directives, Services, Dependency Injection", duration:"", type:"قراءة", videoUrl:"https://angular.io/"},
          {id:"ang-core-01", title:"التوثيق الرسمي — Angular.io", duration:"", type:"قراءة", videoUrl:"https://angular.io/"},
          {id:"ang-core-02", title:"كورس Angular للمبتدئين — FreeCodeCamp", duration:"", type:"فيديو", videoUrl:"https://youtu.be/3qBXWUpoPHo"},
          {id:"ang-core-03", title:"كورس Coding from A to Z (عربي، قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLgU7izgeR2lwwNRNY4fYQf3GZawV-EGnW"},
          {id:"ang-core-04", title:"كورس Monsterlessons Academy", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLEjh-YiSBCDLC_zhXQ2J5SkHrLHdmV8qc"}
        ]},
        { id:"angular-reactive-programming", title:"3. البرمجة التفاعلية (RxJS)", duration:"—", lessons:[
          {id:"ang-rxjs-01", title:"Learn RxJS — موارد ومراجع", duration:"", type:"قراءة", videoUrl:"https://www.learnrxjs.io/"},
          {id:"ang-rxjs-02", title:"RxJS في Angular (عربي، قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLgU7izgeR2lxCLqerQWZYBvv_0UTtPnWb"}
        ]},
        { id:"angular-recommended-projects", title:"🛠️ مشاريع موصى بها", duration:"—", lessons:[
          {id:"angproj-beg-01", title:"مبتدئ: لوحة تحكم إدارية (Admin Dashboard)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/s7bKr_-GLtM"},
          {id:"angproj-beg-02", title:"مبتدئ: محادثة لحظية (Realtime Chat)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/Dg7bZUFopUo"},
          {id:"angproj-beg-03", title:"مبتدئ: تطبيق طقس (Weather App)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/fk0WoYnMbRo"},
          {id:"angproj-int-01", title:"متوسط: تطبيق أفلام (Movie App)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/rmPj2Qlbz3g"},
          {id:"angproj-int-02", title:"متوسط: مشاريع Angular 17 (قائمة تشغيل)", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PL7JmcZV0UQtU5ds45KRtSXA19sOntKTnI"},
          {id:"angproj-adv-01", title:"متقدم: نسخة من تطبيق Spotify", duration:"", type:"مشروع", videoUrl:"https://youtu.be/FzlwWh5lLVU"}
        ]},        { id:"career-frontend", title:"المسار المهني كمطور Frontend", duration:"1 أسبوع", lessons:[
          {id:"cf-resume",       title:"كتابة CV المطور الاحترافي",          duration:"35 دقيقة", type:"فيديو",  videoUrl:"https://www.youtube.com/embed/"},
          {id:"cf-github-profile",title:"تهيئة ملفك على GitHub احترافياً",  duration:"30 دقيقة", type:"تدريب", videoUrl:"https://www.youtube.com/watch?v=KhGWbt1dAKQ"},
          {id:"cf-interview-tech",title:"أسئلة المقابلات التقنية",           duration:"50 دقيقة", type:"فيديو",  videoUrl:"https://www.youtube.com/embed/"},
          {id:"cf-freelance",    title:"Frontend Freelancing البداية",        duration:"35 دقيقة", type:"فيديو",  videoUrl:"https://www.youtube.com/embed/"},
          {id:"cf-salary",       title:"رواتب المطورين وكيف تتفاوض",         duration:"30 دقيقة", type:"فيديو",  videoUrl:"https://www.youtube.com/embed/"},
          {id:"cf-roadmap-next", title:"ما التالي بعد Frontend؟",            duration:"25 دقيقة", type:"فيديو",  videoUrl:"https://www.youtube.com/embed/"},
          {id:"fe-capstone",     title:"مشروع التخرج الشامل: موقع احترافي متكامل", duration:"240 دقيقة", type:"مشروع", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAyGaRGzPVZCkYx5L7Mo9Tbh"}]}
      ]
    }]
  },

  { id:"backend", name:"مطور Backend", cat:"تقني", icon:"⚙️", desc:"بناء الخوادم والـ APIs التي تُشغّل كل شيء خلف الكواليس.",
    longDesc:"مطور Backend هو الشخص اللي بيبني كل حاجة مش بتشوفها — الخوادم وقواعد البيانات والـ APIs اللي بتخلي التطبيقات تشتغل. بيتعامل مع منطق الأعمال وأمان البيانات وسرعة الاستجابة. اختار الفريموورك اللي يناسبك: Node.js (JavaScript)، .NET (C#)، Laravel (PHP)، أو Spring (Java) — كل مسار مستقل بالكامل وبيوصلك لمستوى Senior في فريموورك واحد.", difficulty:"صعب", time:"6-12 شهر", match:82, salary:"1500-7000$",
    tools:["Node.js",".NET","Laravel","Spring","PostgreSQL","MongoDB","Redis","Docker"],
    daily:["بناء وتطوير APIs","إدارة قواعد البيانات","حل مشاكل الأداء","code review","نشر التحديثات"],
    roadmap:[{t:"لغة وفريموورك",d:"Node.js / .NET / Laravel / Spring — اختر واحد"},{t:"قواعد البيانات",d:"SQL و NoSQL"},{t:"REST APIs",d:"بناء APIs كاملة"},{t:"Authentication",d:"JWT, OAuth, Security"},{t:"Deployment",d:"Render, Railway, AWS Basics"}],
    course:"https://www.freecodecamp.org/learn/back-end-development-and-apis/", example:"مطور Backend متوسط الخبرة يكسب 2500-5000$.",
    tracks:[
      {
        id:"backend-nodejs-track", title:"مسار Backend بـ Node.js", subtitle:"من أساسيات الويب إلى الأنظمة المُوزّعة بجافاسكريبت",
        longDesc:"مسار Node.js الكامل: يبدأ من أساسيات الويب وJavaScript، ثم Node.js وExpress، فالتحقق والمصادقة (JWT, OAuth)، فقواعد البيانات وORMs، فـ Websockets وGraphQL، وينتهي بـ Design Patterns والأمان والـ Microservices. 5 مستويات (Level 0-4) على مدار ~31 أسبوع.",
        level:"مبتدئ → متقدم", duration:"~31 أسبوع (~7-8 أشهر)", totalLessons:154, icon:"🟢", color:"#3c873a", coverImage:"assets/pngtree-a-hand-writing-code-on-digital-interface-with-glowing-connections-symbolizing-image_17075797.jpg",
        intro:{
          tools:[
            {name:"Node.js", purpose:"بيئة تشغيل JavaScript على السيرفر", url:"https://nodejs.org/"},
            {name:"VS Code", purpose:"محرر الكود", url:"https://code.visualstudio.com/Download"},
            {name:"Postman", purpose:"اختبار الـ APIs", url:"https://www.postman.com/downloads/"},
            {name:"MongoDB Compass", purpose:"إدارة قاعدة بيانات MongoDB", url:"https://www.mongodb.com/products/compass"}
          ],
          accounts:[
            {name:"GitHub", why:"حفظ مشاريعك ومتابعة تقدّمك", url:"https://github.com/"},
            {name:"MongoDB Atlas", why:"قاعدة بيانات سحابية مجانية", url:"https://www.mongodb.com/cloud/atlas"}
          ],
          plan:[
            {title:"Level 0: Entry", duration:"3 أسابيع", goal:"أساسيات الويب، Git، قواعد البيانات، الشبكات"},
            {title:"Level 1: JS & Node Basics", duration:"8 أسابيع", goal:"JavaScript كامل، Node.js، Express، أول مشروع"},
            {title:"Level 2: Architecture & Auth", duration:"10 أسابيع", goal:"TypeScript، MVC، JWT، OAuth، الاختبار والنشر"},
            {title:"Level 3: Databases & Realtime", duration:"10 أسابيع", goal:"SQL متقدم، ORMs، Websockets، GraphQL، Caching"},
            {title:"Level 4: Senior Topics", duration:"10 أسابيع", goal:"Design Patterns، الأمان، Microservices، System Design"}
          ],
          challenge:[
            {name:"roadmap.sh/backend", url:"https://roadmap.sh/backend"},
            {name:"GitHub", url:"https://github.com/"}
          ]
        },
        courses:[
        { id:"be-node-l0-week1", title:"Level 0 - الأسبوع 1: أساسيات الويب", duration:"أسبوع", lessons:[
          {id:"be-node-l0-w1-01", title:"أساسيات HTML — Abdelrahman Gamal", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=q3yFo-t1ykw"},
          {id:"be-node-l0-w1-02", title:"أساسيات CSS — Abdelrahman Gamal", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=Z-5QVutAEW4"},
          {id:"be-node-l0-w1-03", title:"أدوات المتصفح Chrome Dev Tools — Elzero Web School", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=_IKTGQosYMo"},
          {id:"be-node-l0-w1-04", title:"HTML & CSS Crash Course (إنجليزي) — The Net Ninja", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G"},
          {id:"be-node-l0-w1-quiz", title:"اختبار الأسبوع 1", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSccZkQkxZGI7U0Ub3G4gkdeB1kQS543r0Ke8oc1GxQGPsUqaA/viewform"}
        ]},
        { id:"be-node-l0-week2", title:"Level 0 - الأسبوع 2: Git وقواعد البيانات", duration:"أسبوع", lessons:[
          {id:"be-node-l0-w2-01", title:"Git & GitHub — Big Data Arabic", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=Q6G-J54vgKc"},
          {id:"be-node-l0-w2-02", title:"ما هي قواعد البيانات؟ — GeekHood", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=rQKJFlsifR8"},
          {id:"be-node-l0-w2-03", title:"SQL مقابل NoSQL — JobStack", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=WWazrq7ZC8E"},
          {id:"be-node-l0-w2-04", title:"Git & GitHub (إنجليزي) — freeCodeCamp", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=RGOj5yH7evk"},
          {id:"be-node-l0-w2-quiz", title:"اختبار الأسبوع 2", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSckNevVyZjGskPr5SM5otcZrEgdHdWsCBfvJV1ka7lt4uhuOA/viewform"}
        ]},
        { id:"be-node-l0-week3", title:"Level 0 - الأسبوع 3: الشبكات", duration:"أسبوع", lessons:[
          {id:"be-node-l0-w3-01", title:"أساسيات الشبكات لمطوري الويب", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLNE3WjwctlOy1ekMfZl9AbLyFivSgsfml"},
          {id:"be-node-l0-w3-02", title:"أساسيات الشبكات (إنجليزي) — Network Direction", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLCy5RQkQgvf4yaL-AMDO8rpAAi90sWfGl"},
          {id:"be-node-l0-w3-03", title:"ما هو DNS؟ — ByteByteGo", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=27r4Bzuj5NQ"},
          {id:"be-node-l0-w3-quiz", title:"اختبار الأسبوع 3", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLScB8MEoJEWOpbGW9VVFquEbY0E7aFZtHSEuE7w4NGCoG9dZcg/viewform"}
        ]},
        { id:"be-node-l1-week1", title:"Level 1 - الأسبوع 1: صياغة JavaScript", duration:"أسبوع", lessons:[
          {id:"be-node-l1-w1-01", title:"صياغة JavaScript والمتغيرات وأنواع البيانات — Elzero [1:30]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv"},
          {id:"be-node-l1-w1-02", title:"(إنجليزي) The Net Ninja [1:2]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL4cUxeGkcC9haFPT7J25Q9GRB_ZkFrQAc"},
          {id:"be-node-l1-w1-quiz", title:"اختبار الأسبوع 1", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSeCDpqhlsepyeFsjBNd3BeZdB2ERplwpBZQBq74-uvDasfnSA/viewform"}
        ]},
        { id:"be-node-l1-week2", title:"Level 1 - الأسبوع 2: المصفوفات والدوال", duration:"أسبوع", lessons:[
          {id:"be-node-l1-w2-01", title:"المصفوفات وجمل التحكم — Elzero [31:56]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv"},
          {id:"be-node-l1-w2-02", title:"الدوال والكائنات والدوال العليا — Elzero [57:85]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv"},
          {id:"be-node-l1-w2-03", title:"الرفع Hoisting — Shadow Coding", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=XrCMAmxGA7o"},
          {id:"be-node-l1-w2-04", title:"(إنجليزي) Arrays — Dave Gray", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=0SyTDl4pb4w"},
          {id:"be-node-l1-w2-quiz", title:"اختبار الأسبوع 2", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSdlj9g0KJvTnP7N6E0ypGrtDZIL-9gXeQMFXrh_iqBKU-Bb0g/viewform"}
        ]},
        { id:"be-node-l1-week3", title:"Level 1 - الأسبوع 3: Destructuring و Map/Set و Regex", duration:"أسبوع", lessons:[
          {id:"be-node-l1-w3-01", title:"Destructuring و Spread Operator — Elzero [115:122]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv"},
          {id:"be-node-l1-w3-02", title:"Map و Set ودوال المصفوفات — Elzero [123:133]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv"},
          {id:"be-node-l1-w3-03", title:"التعبيرات النمطية Regex — Elzero [134:146]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv"},
          {id:"be-node-l1-w3-04", title:"الإغلاق Closures — Shadow Coding", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=a2jVZ8bUm48"},
          {id:"be-node-l1-w3-05", title:"(إنجليزي) Destructuring — Web Dev Simplified", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=NIq3qLaHCIs"},
          {id:"be-node-l1-w3-quiz", title:"اختبار الأسبوع 3", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLScKZsGeKQBp2GHEBSXsVpH-Jkl-m6NaDk5Yah8opg8ZpTIklQ/viewform"}
        ]},
        { id:"be-node-l1-week4", title:"Level 1 - الأسبوع 4: البرمجة الكائنية OOP", duration:"أسبوع", lessons:[
          {id:"be-node-l1-w4-01", title:"العقلية الكائنية OOP Mindset — Agmad Shar7", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLNE3WjwctlOwYMwSNoLJtHhQQ7o-OVAEE"},
          {id:"be-node-l1-w4-02", title:"البرمجة الكائنية OOP — Elzero [147:158]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv"},
          {id:"be-node-l1-w4-03", title:"التاريخ والوقت + Generators + ES Modules — Elzero [159:168]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv"},
          {id:"be-node-l1-w4-04", title:"(إنجليزي) OOP — The Net Ninja", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL4cUxeGkcC9i5yvDkJgt60vNVWffpblB7"},
          {id:"be-node-l1-w4-quiz", title:"اختبار الأسبوع 4", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSd2IiaD-oypcYGGMBujU2My9ghu7rS_xi1HWZIUv-esLryM8Q/viewform"}
        ]},
        { id:"be-node-l1-week5", title:"Level 1 - الأسبوع 5: البرمجة غير المتزامنة وJSON", duration:"أسبوع", lessons:[
          {id:"be-node-l1-w5-01", title:"البرمجة غير المتزامنة وJSON وAPIs — Elzero [169:188]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv"},
          {id:"be-node-l1-w5-02", title:"معالجة الأخطاء Error Handling — Tarmeez", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=YPIuFG310A8"},
          {id:"be-node-l1-w5-03", title:"(إنجليزي) Async/JSON/APIs — The Net Ninja", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL4cUxeGkcC9jx2TTZk3IGWKSbtugYdrlu"},
          {id:"be-node-l1-w5-quiz", title:"اختبار الأسبوع 5", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSecUunHN2jEN-lxtrs0Aqg5TE-_8Xgd4WXcTl_VspY77__JaA/viewform"}
        ]},
        { id:"be-node-l1-week6", title:"Level 1 - الأسبوع 6: بيئة Node.js", duration:"أسبوع", lessons:[
          {id:"be-node-l1-w6-01", title:"بيئة تشغيل Node.js — Codezone [1:3]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLQtNtS-WfRa8OF9juY3k6WUWayMfDKHK2"},
          {id:"be-node-l1-w6-02", title:"Node.js — KMR Script [1:6]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLL2zWZTDFZzgxxD66mv95I8hC0pby5bdp"},
          {id:"be-node-l1-w6-03", title:"(إنجليزي) Node.js — The Net Ninja [1:5]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU"},
          {id:"be-node-l1-w6-quiz", title:"اختبار الأسبوع 6", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSeZEB1nt4JeGP5RkW8Q78aN8MhmhNyX4O13PO9wRteNagfSlA/viewform"}
        ]},
        { id:"be-node-l1-week7", title:"Level 1 - الأسبوع 7: مبادئ Backend و MongoDB", duration:"أسبوع", lessons:[
          {id:"be-node-l1-w7-01", title:"مبادئ الـ Backend (إنجليزي) — Sriniously [1:6]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLui3EUkuMTPgZcV0QhQrOcwMPcBCcd_Q1"},
          {id:"be-node-l1-w7-02", title:"MongoDB — Bro Code / Web Dev Simplified", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=c2M-rlkkT5o"}
        ]},
        { id:"be-node-l1-week8", title:"Level 1 - الأسبوع 8: Express.js و Mongoose", duration:"أسبوع", lessons:[
          {id:"be-node-l1-w8-01", title:"Express.js و Mongoose و Template Engines — Courses 4 Arab [1:19]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLeWmXrh00479LgmvKAdU8WV2nRXqX4ley"},
          {id:"be-node-l1-w8-02", title:"(إنجليزي) Express.js — The Net Ninja [6:12]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU"},
          {id:"be-node-l1-w8-quiz", title:"اختبار الأسبوع 8", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSfkxmlid4Y34YoaN9SPeBfYw4xasi-PtY7sY1gxFc3IgnQBtQ/viewform"}
        ]},
        { id:"be-node-l1-final-project", title:"Level 1 - المشروع الختامي", duration:"—", lessons:[
          {id:"be-node-l1-final", title:"المشروع الختامي: URL Shortener — الكود الأساسي والوصف", duration:"", type:"مشروع", videoUrl:"https://github.com/cat-backend-nodejs/url-shortener"}
        ]},
        { id:"be-node-l2-week1", title:"Level 2 - الأسبوع 1: TypeScript", duration:"أسبوع", lessons:[
          {id:"be-node-l2-w1-01", title:"TypeScript — Elzero Web School", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAy532K9M_fjiAmrJ0gkCyLJ"},
          {id:"be-node-l2-w1-02", title:"TypeScript مع تطبيقات Backend — Youssef Abbas", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=N17Tef8gh-Q"},
          {id:"be-node-l2-w1-03", title:"(إنجليزي) TypeScript — The Net Ninja", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL4cUxeGkcC9gNhFQgS4edYLqP7LkZcFMN"},
          {id:"be-node-l2-w1-quiz", title:"اختبار الأسبوع 1", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSdYHFMMbVj5a_FZfIQ8JTeCBOIWdyex2TlEdYMcRne3DPL9OA/viewform"}
        ]},
        { id:"be-node-l2-week2", title:"Level 2 - الأسبوع 2: هيكلة المشروع MVC", duration:"أسبوع", lessons:[
          {id:"be-node-l2-w2-01", title:"هيكلة المشروع: Controllers و Services — Courses 4 Arab", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=uoHjKX5cmzY"},
          {id:"be-node-l2-w2-02", title:"متغيرات البيئة Environment Variables — Hassan Saad / Algorithm Academy", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=lu7q8lbuUW4"},
          {id:"be-node-l2-w2-03", title:"(إنجليزي) Controllers and Services — Covalence", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=ZWQlUXV74w0"},
          {id:"be-node-l2-w2-quiz", title:"اختبار الأسبوع 2", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSfACZEJqxmpChEQZv-mF7Bbmkt67iRgqudtSDGfmlzyjZIjJQ/viewform"}
        ]},
        { id:"be-node-l2-week3", title:"Level 2 - الأسبوع 3: التحقق ومعالجة الأخطاء", duration:"أسبوع", lessons:[
          {id:"be-node-l2-w3-01", title:"التحقق بـ express-validator — Index Academy [44:47]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDQ11FgmbqQNFuGQTKbAIGEyOKWUGBs6i"},
          {id:"be-node-l2-w3-02", title:"التحقق بـ Zod — Fullstack Yazan / Seif El-Din Sweilam", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=L54fj-7pywY"},
          {id:"be-node-l2-w3-03", title:"معالجة الأخطاء Error Handling — Index Academy [36:43]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDQ11FgmbqQNFuGQTKbAIGEyOKWUGBs6i"},
          {id:"be-node-l2-w3-04", title:"(إنجليزي) Schema Validation with Zod — Web Dev Simplified", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=L6BE-U3oy80"},
          {id:"be-node-l2-w3-quiz", title:"اختبار الأسبوع 3", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSfnfmkXeEE5XmWWtO6VVbpp_QP3JnMmp2OMmwNBj4b4a8Kwng/viewform"}
        ]},
        { id:"be-node-l2-week4", title:"Level 2 - الأسبوع 4: الجلسات وأمان كلمات المرور", duration:"أسبوع", lessons:[
          {id:"be-node-l2-w4-01", title:"مشروع MVC: User Management Dashboard — Courses 4 Arab", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/watch?v=6fBgH9nYC_s"},
          {id:"be-node-l2-w4-02", title:"الجلسات Sessions — Emam Academy", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=XbpAGY6ZzHY"},
          {id:"be-node-l2-w4-03", title:"أمان كلمات المرور وBcrypt — Programming Advice / Bassant's Tips", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=2-w_WFAfir0"},
          {id:"be-node-l2-w4-04", title:"(إنجليزي) Session-Based Authentication — The Full Stack Junkie", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=TDe7DRYK8vU"},
          {id:"be-node-l2-w4-quiz", title:"اختبار الأسبوع 4", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLScB2w0fmxhXXSb_S4ueqOZLzZWAgBwi4WVjyRLZGnLh6JJSzA/viewform"}
        ]},
        { id:"be-node-l2-week5", title:"Level 2 - الأسبوع 5: رفع الملفات", duration:"أسبوع", lessons:[
          {id:"be-node-l2-w5-01", title:"رفع الملفات بـ Multer — Youssef Abbas / Khalid Elshafie", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=j9ibqDLmKZs"},
          {id:"be-node-l2-w5-02", title:"(إنجليزي) urlencoded vs multipart Form Data — TechFunnel", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=DHF-pH4hitc"},
          {id:"be-node-l2-w5-03", title:"مشروع: تطبيق مشابه لـ Pinterest برفع صور وتسجيل دخول", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/watch?v=wIOpe8S2Mk8"},
          {id:"be-node-l2-w5-quiz", title:"اختبار الأسبوع 5", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSeu9FpCF7HXDz7WYbBYbeTrXZp7ETZrhhl8RV2MqJ0tdPms1Q/viewform"}
        ]},
        { id:"be-node-l2-week6", title:"Level 2 - الأسبوع 6: REST APIs", duration:"أسبوع", lessons:[
          {id:"be-node-l2-w6-01", title:"Server-Side مقابل Client-Side Rendering — Amr Mohamed", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=zAJs2T1xAFE"},
          {id:"be-node-l2-w6-02", title:"مقدمة REST APIs و JSON — Tarmeez", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=rq7DvjN1Gco"},
          {id:"be-node-l2-w6-03", title:"REST عملياً مع Express — Codezone [5:7] / Index Academy", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLQtNtS-WfRa8OF9juY3k6WUWayMfDKHK2"},
          {id:"be-node-l2-w6-04", title:"(إنجليزي) Intro to REST APIs — Academind", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=0oXYLzuucwE"},
          {id:"be-node-l2-w6-quiz", title:"اختبار الأسبوع 6", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLScKXITqpQsNkn3vJqAOPR1fvBa_ZqpRrSWh133LvP4apftEMg/viewform"}
        ]},
        { id:"be-node-l2-week7", title:"Level 2 - الأسبوع 7: JWT والفلترة والترقيم", duration:"أسبوع", lessons:[
          {id:"be-node-l2-w7-01", title:"Session-Based مقابل Token-Based Authentication — pragma", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=aanOygFD4Fo"},
          {id:"be-node-l2-w7-02", title:"JWT Authentication — Index Academy / CodeZone", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDQ11FgmbqQO6KEhqLzT_USha4ZysXY2C"},
          {id:"be-node-l2-w7-03", title:"Filtering و Sorting و Pagination — Index Academy [70:77]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDQ11FgmbqQNFuGQTKbAIGEyOKWUGBs6i"},
          {id:"be-node-l2-w7-04", title:"(إنجليزي) REST API in Action with Authentication — TomDoesTech", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=BWUi6BS9T5Y"},
          {id:"be-node-l2-w7-quiz", title:"اختبار الأسبوع 7", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSdVRoKLg390eGt-J74mE9yWrHqnEbqcgBTjekI68ox7qaEXlQ/viewform"}
        ]},
        { id:"be-node-l2-week8", title:"Level 2 - الأسبوع 8: OAuth 2.0 و Passport.js", duration:"أسبوع", lessons:[
          {id:"be-node-l2-w8-01", title:"آلية OAuth 2.0 — Almadrasa", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=86qNjL7I00w"},
          {id:"be-node-l2-w8-02", title:"Passport.js (Local + OAuth2) — Code With Zeyad / Algorithm Academy", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=GsqkTEvnC8s"},
          {id:"be-node-l2-w8-03", title:"أمان الـ API و Rate Limiting — Ahmed Elemam / Youssef Abbas", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=a0g8rI4j4qc"},
          {id:"be-node-l2-w8-04", title:"(إنجليزي) Google OAuth 2.0 — TomDoesTech", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=Qt3KJZ2kQk0"},
          {id:"be-node-l2-w8-quiz", title:"اختبار الأسبوع 8", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSe-K-FvNw70nHSq6BGWGPir8lbvrloSEfIaC0eNX9S3FyNlfg/viewform"}
        ]},
        { id:"be-node-l2-week9", title:"Level 2 - الأسبوع 9: إرسال الإيميلات والرسائل", duration:"أسبوع", lessons:[
          {id:"be-node-l2-w9-01", title:"بروتوكول SMTP — DeepWave Technology", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=W3xCWR5WjvY"},
          {id:"be-node-l2-w9-02", title:"إرسال الإيميلات بـ Nodemailer — Youssef Abbas", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=AGErsRWd-6Y"},
          {id:"be-node-l2-w9-03", title:"(إنجليزي) خدمات بريد خارجية: Resend و SendGrid", duration:"", type:"قراءة", videoUrl:"https://resend.com/"},
          {id:"be-node-l2-w9-04", title:"إرسال SMS بـ Twilio API — AyyazTech", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=vs4in-UFdX0"}
        ]},
        { id:"be-node-l2-week10", title:"Level 2 - الأسبوع 10: الاختبار والتوثيق والنشر", duration:"أسبوع", lessons:[
          {id:"be-node-l2-w10-01", title:"اختبار البرمجيات Software Testing — Tresmerge", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLzNfs-3kBUJllCa8_6pLYDMnIlg6Lfvu4"},
          {id:"be-node-l2-w10-02", title:"توثيق API بـ Swagger — Ali Hassan", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=dHUkSDk5Z4o"},
          {id:"be-node-l2-w10-03", title:"النشر Deployment — Mahmoud Abdullah (Cyclic) / Railway", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=0etHXuy_vbk"},
          {id:"be-node-l2-w10-04", title:"(إنجليزي) Jest Testing Framework — freeCodeCamp", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=IPiUDhwnZxA"},
          {id:"be-node-l2-w10-quiz", title:"اختبار الأسبوع 10", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSfW1NRZyj8mgsxfFcbiqN6MlaIifQPDxKMV-yQKxgC159eOww/viewform"}
        ]},
        { id:"be-node-l2-final-project", title:"Level 2 - المشروع الختامي", duration:"—", lessons:[
          {id:"be-node-l2-final", title:"المشروع الختامي: Task Grading Hub", duration:"", type:"مشروع", videoUrl:"https://github.com/cat-backend-nodejs/task-grading-hub"}
        ]},
        { id:"be-node-l3-week1", title:"Level 3 - الأسبوع 1: استعلامات SQL", duration:"أسبوع", lessons:[
          {id:"be-node-l3-w1-01", title:"استعلامات SQL (DDL/DML) — Mohamed El Desouki", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL1DUmTEdeA6L6oDLTveTt4Z7E5qEfFluE"},
          {id:"be-node-l3-w1-02", title:"SQL Joins — Mohamed El Desouki / Tech Vault", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=58Lsm9ly7cU"},
          {id:"be-node-l3-w1-03", title:"SQL Aggregations — Mohamed El Desouki", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=8aNhhMi2ce4"},
          {id:"be-node-l3-w1-04", title:"(إنجليزي) SQL Joins — techTFQ", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=0OQJDd3QqQM"},
          {id:"be-node-l3-w1-task", title:"مهمة: تمارين SQL Fundamentals", duration:"", type:"مشروع", videoUrl:"https://github.com/saifsweelam/databases-intro-roadmap/tree/main/week-3"}
        ]},
        { id:"be-node-l3-week2", title:"Level 3 - الأسبوع 2: Subqueries والتسوية والـ Views", duration:"أسبوع", lessons:[
          {id:"be-node-l3-w2-01", title:"SQL Subqueries — Tech Vault [8]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLE8kQVoC67Py5LnCUHp_wp2uzbaBZWSmx"},
          {id:"be-node-l3-w2-02", title:"تسوية قواعد البيانات Normalization — Tech Vault / Metigator", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=0Jps8KJSjy4"},
          {id:"be-node-l3-w2-03", title:"SQL Views — Tech Vault [9,10]", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLE8kQVoC67Py5LnCUHp_wp2uzbaBZWSmx"},
          {id:"be-node-l3-w2-task", title:"مهمة: Normalization & Views", duration:"", type:"مشروع", videoUrl:"https://github.com/saifsweelam/databases-intro-roadmap/tree/main/week-4"}
        ]},
        { id:"be-node-l3-week3", title:"Level 3 - الأسبوع 3: الفهرسة والمعاملات والتزامن", duration:"أسبوع", lessons:[
          {id:"be-node-l3-w3-01", title:"الفهرسة Database Indexing — Tech Vault / Metigator", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLE8kQVoC67PzGwMMsSk3C8MvfAqcYjusF"},
          {id:"be-node-l3-w3-02", title:"Database Transactions — Tech Vault / Mohamed El Desouki", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL1DUmTEdeA6Lg6CXlnxEDhwpmWB0QaDh5"},
          {id:"be-node-l3-w3-03", title:"التزامن والأقفال Concurrency & Locks — Tech Vault", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLE8kQVoC67PzGwMMsSk3C8MvfAqcYjusF"},
          {id:"be-node-l3-w3-task", title:"مهمة: Database Internals", duration:"", type:"مشروع", videoUrl:"https://github.com/saifsweelam/databases-intro-roadmap/tree/main/week-5"}
        ]},
        { id:"be-node-l3-week4", title:"Level 3 - الأسبوع 4: ORMs (Prisma, Sequelize, Drizzle, TypeORM)", duration:"أسبوع", lessons:[
          {id:"be-node-l3-w4-01", title:"ترحيل قواعد البيانات Migrations — pragma", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=TmVRKDoMulE"},
          {id:"be-node-l3-w4-02", title:"ORM: Prisma — Simple Arab Code / Ali Sleem", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=uRPLhqR_d5I"},
          {id:"be-node-l3-w4-03", title:"ORM: Sequelize — Algorithm Academy", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLfDx4cQoUNObHX28K6FS38LkB2CPLGGfx"},
          {id:"be-node-l3-w4-04", title:"(إنجليزي) ORM: Drizzle — Web Dev Simplified", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=7-NZ0MlPpJA"},
          {id:"be-node-l3-w4-05", title:"(إنجليزي) ORM: TypeORM — CoderOne / Laith Academy", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=Reb7ISQZCvA"}
        ]},
        { id:"be-node-l3-week5", title:"Level 3 - الأسبوع 5: Websockets و WebRTC", duration:"أسبوع", lessons:[
          {id:"be-node-l3-w5-01", title:"مقدمة Websockets — Reach Star", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qMTCN-eb2Xs"},
          {id:"be-node-l3-w5-02", title:"Websocket عبر socket.io — Codezone / KMR Script / Smart Code", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=IUfCXmQwm1w"},
          {id:"be-node-l3-w5-03", title:"WebRTC والاتصال Peer-to-Peer — KMR Script", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=1cHC92DN-Zo"},
          {id:"be-node-l3-w5-04", title:"(إنجليزي) Websocket via ws — JavaScript Mastery", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=pbOXOY78dNA"}
        ]},
        { id:"be-node-l3-week6", title:"Level 3 - الأسبوع 6: مشروع تطبيق شات", duration:"أسبوع", lessons:[
          {id:"be-node-l3-w6-01", title:"مشروع: تطبيق شات بـ socket.io — KMR Script [52:63]", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/playlist?list=PLL2zWZTDFZzgxxD66mv95I8hC0pby5bdp"},
          {id:"be-node-l3-w6-02", title:"(إنجليزي) Chat App — Mafia Codes / Traversy Media", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/watch?v=jD7FnbI76Hg"}
        ]},
        { id:"be-node-l3-week7", title:"Level 3 - الأسبوع 7: أتمتة المتصفح وWeb Scraping", duration:"أسبوع", lessons:[
          {id:"be-node-l3-w7-01", title:"أتمتة المتصفح وWeb Scraping بـ puppeteer — Tresmerge", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=gh7TmUcku8M"},
          {id:"be-node-l3-w7-02", title:"(إنجليزي) Puppeteer — Michael Kitas / Traversy Media", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLuJJZ-W1NwdqgvE0D-1SMS7EpWIC5cKqu"}
        ]},
        { id:"be-node-l3-week8", title:"Level 3 - الأسبوع 8: الدفع الإلكتروني", duration:"أسبوع", lessons:[
          {id:"be-node-l3-w8-01", title:"تحديات الدفع الإلكتروني — JobStack", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=isakqT0fOsY"},
          {id:"be-node-l3-w8-02", title:"ربط Paymob — Eng. Mina Soltans", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=hev6jEEJuLw"},
          {id:"be-node-l3-w8-03", title:"(إنجليزي) Stripe Integration — manfra.io / Web Dev Simplified", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=cheDHoEazPs"},
          {id:"be-node-l3-w8-04", title:"(إنجليزي) PayPal Integration — manfra.io", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=QbdDg8wgBYg"}
        ]},
        { id:"be-node-l3-week9", title:"Level 3 - الأسبوع 9: GraphQL", duration:"أسبوع", lessons:[
          {id:"be-node-l3-w9-01", title:"مقدمة GraphQL — Ahmed Elemam / Yallacode", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=dhsU0rrLATY"},
          {id:"be-node-l3-w9-02", title:"GraphQL عملياً — Ali Sleem / Learn With Naw", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=B_r_REcIO8g"},
          {id:"be-node-l3-w9-03", title:"(إنجليزي) GraphQL — Fireship / The Net Ninja", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=eIQh02xuVw4"}
        ]},
        { id:"be-node-l3-week10", title:"Level 3 - الأسبوع 10: Caching و Redis", duration:"أسبوع", lessons:[
          {id:"be-node-l3-w10-01", title:"استراتيجيات الـ Caching — JobStack", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=XP32O_gMZkA"},
          {id:"be-node-l3-w10-02", title:"مقدمة Redis — Islam Mahmoud", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=LILkBFQKdi0"},
          {id:"be-node-l3-w10-03", title:"(إنجليزي) Redis Crash Course — Web Dev Simplified / Net Ninja", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=jgpVdJB2sKQ"},
          {id:"be-node-l3-w10-04", title:"(إنجليزي) CRON Jobs and Schedules — Better Stack", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=_WFcUzO_9CY"}
        ]},
        { id:"be-node-l4-week1", title:"Level 4 - الأسبوع 1: Design Patterns الإنشائية", duration:"أسبوع", lessons:[
          {id:"be-node-l4-w1-01", title:"مقدمة Design Patterns — Passionate Coders", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=aSDdHSW6_bU"},
          {id:"be-node-l4-w1-02", title:"Creational Patterns: Factory و Singleton — Passionate Coders / DevGeeks", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=rnUk_ivqtmo"},
          {id:"be-node-l4-w1-03", title:"Creational Patterns: Builder و Prototype — Mohamed Reda", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=51Ap3s__P_Q"},
          {id:"be-node-l4-w1-04", title:"(إنجليزي) Design Patterns — Web Dev Simplified / Christopher Okhravi", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=BWprw8UHIzA"}
        ]},
        { id:"be-node-l4-week2", title:"Level 4 - الأسبوع 2: Design Patterns البنائية", duration:"أسبوع", lessons:[
          {id:"be-node-l4-w2-01", title:"Structural Patterns: Adapter و Bridge — Passionate Coders / DevGeeks", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=9YNAPv4Uz98"},
          {id:"be-node-l4-w2-02", title:"Structural Patterns: Composite و Decorator و Facade", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=jZgHOd3K-0s"},
          {id:"be-node-l4-w2-03", title:"Structural Patterns: Flyweight و Proxy — Mohamed Reda", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=VP0pL-6q55U"},
          {id:"be-node-l4-w2-04", title:"(إنجليزي) Structural Patterns — Christopher Okhravi", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=2PKQtcJjYvc"}
        ]},
        { id:"be-node-l4-week3", title:"Level 4 - الأسبوع 3: Design Patterns السلوكية (1)", duration:"أسبوع", lessons:[
          {id:"be-node-l4-w3-01", title:"Behavioral Patterns: Chain of Responsibility و Observer", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=MGz-yzPZSrw"},
          {id:"be-node-l4-w3-02", title:"Behavioral Patterns: Command و Interpreter و Iterator", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=jZgHOd3K-0s"},
          {id:"be-node-l4-w3-03", title:"(إنجليزي) Behavioral Patterns — Christopher Okhravi / levonog", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=CeFxMlQZxyI"}
        ]},
        { id:"be-node-l4-week4", title:"Level 4 - الأسبوع 4: Design Patterns السلوكية (2)", duration:"أسبوع", lessons:[
          {id:"be-node-l4-w4-01", title:"Behavioral Patterns: Mediator و Memento — DevGeeks / Passionate Coders", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=TqXouSAPoPg"},
          {id:"be-node-l4-w4-02", title:"Behavioral Patterns: State و Strategy و Template و Visitor", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=0-AK2oX2-_g"},
          {id:"be-node-l4-w4-03", title:"(إنجليزي) State/Strategy/Template — Christopher Okhravi / DevSage", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=N12L5D78MAA"}
        ]},
        { id:"be-node-l4-week5", title:"Level 4 - الأسبوع 5: Linux و SSH واستضافة VPS", duration:"أسبوع", lessons:[
          {id:"be-node-l4-w5-01", title:"موضوع: Linux ونظام التشغيل لمطوري الباك إند", duration:"", type:"قراءة", videoUrl:"https://roadmap.sh/backend"},
          {id:"be-node-l4-w5-02", title:"موضوع: بروتوكول SSH واستضافة VPS", duration:"", type:"قراءة", videoUrl:"https://roadmap.sh/backend"}
        ]},
        { id:"be-node-l4-week6", title:"Level 4 - الأسبوع 6: أمان تطبيقات الويب", duration:"أسبوع", lessons:[
          {id:"be-node-l4-w6-01", title:"موضوع: الأمان في تطبيقات الويب وتجنّب الهجمات الشائعة", duration:"", type:"قراءة", videoUrl:"https://roadmap.sh/backend"},
          {id:"be-node-l4-w6-02", title:"موضوع: تصميم طبقات الأمان Security Layers", duration:"", type:"قراءة", videoUrl:"https://roadmap.sh/backend"}
        ]},
        { id:"be-node-l4-week7", title:"Level 4 - الأسبوع 7: بنية Microservices", duration:"أسبوع", lessons:[
          {id:"be-node-l4-w7-01", title:"موضوع: بنية الـ Microservices", duration:"", type:"قراءة", videoUrl:"https://roadmap.sh/backend"}
        ]},
        { id:"be-node-l4-week8", title:"Level 4 - الأسبوع 8: الأتمتة و Docker", duration:"أسبوع", lessons:[
          {id:"be-node-l4-w8-01", title:"موضوع: أتمتة المهام والـ Pipelines", duration:"", type:"قراءة", videoUrl:"https://roadmap.sh/backend"},
          {id:"be-node-l4-w8-02", title:"موضوع: Containers — مفهوم Docker و Kubernetes", duration:"", type:"قراءة", videoUrl:"https://roadmap.sh/backend"}
        ]},
        { id:"be-node-l4-week9", title:"Level 4 - الأسبوع 9: أساسيات System Design", duration:"أسبوع", lessons:[
          {id:"be-node-l4-w9-01", title:"موضوع: أساسيات تصميم الأنظمة System Design", duration:"", type:"قراءة", videoUrl:"https://roadmap.sh/backend"}
        ]},
        { id:"be-node-l4-week10", title:"Level 4 - الأسبوع 10: SDLC و DevOps", duration:"أسبوع", lessons:[
          {id:"be-node-l4-w10-01", title:"موضوع: دورة حياة تطوير البرمجيات SDLC وArchitecture Agile وDevOps Workflow", duration:"", type:"قراءة", videoUrl:"https://roadmap.sh/backend"}
        ]},
        ]
      },
      {
        id:"backend-dotnet-track", title:"مسار Backend بـ .NET", subtitle:"من C# الأساسي إلى تطبيقات Enterprise كاملة",
        longDesc:"مسار .NET الكامل: يبدأ بأساسيات الويب وC#، ثم OOP والـ Generics، فـ SOLID وSQL وLINQ وEntity Framework Core، وينتهي بمواضيع متقدمة (Clean Architecture, Testing, Microservices). 3 مستويات (Entry/Beginner مدموجين، Intermediate، Advanced) على مدار 35 أسبوع.",
        level:"مبتدئ → متقدم", duration:"35 أسبوع (~8 أشهر)", totalLessons:91, icon:"🔷", color:"#512bd4", coverImage:"assets/pngtree-a-hand-writing-code-on-digital-interface-with-glowing-connections-symbolizing-image_17075797.jpg",
        intro:{
          tools:[
            {name:"Visual Studio", purpose:"بيئة التطوير الرسمية لـ .NET", url:"https://visualstudio.microsoft.com/downloads/"},
            {name:".NET SDK", purpose:"أدوات تشغيل وبناء مشاريع .NET", url:"https://dotnet.microsoft.com/download"},
            {name:"SQL Server / Azure Data Studio", purpose:"إدارة قواعد البيانات", url:"https://azure.microsoft.com/products/data-studio"}
          ],
          accounts:[
            {name:"GitHub", why:"حفظ مشاريعك ومتابعة تقدّمك", url:"https://github.com/"},
            {name:"Microsoft Learn", why:"شهادات ومسارات تعلّم رسمية", url:"https://learn.microsoft.com/"}
          ],
          plan:[
            {title:"Entry Level", duration:"2 أسابيع", goal:"أساسيات الويب: HTML, CSS, JS, Git, Bootstrap"},
            {title:"Beginner Level", duration:"12 أسبوع", goal:"C#, OOP, Generics, SOLID, SQL, LINQ, EF Core"},
            {title:"Intermediate Level", duration:"12 أسبوع", goal:"ASP.NET Core, Identity, Testing, Clean Architecture"},
            {title:"Advanced Level", duration:"9 أسابيع", goal:"Advanced EF Core, Caching, Microservices, System Design"}
          ],
          challenge:[
            {name:"roadmap.sh/backend", url:"https://roadmap.sh/backend"},
            {name:"Microsoft Learn", url:"https://learn.microsoft.com/"}
          ]
        },
        courses:[
        { id:"be-dotnet-entry-w01", title:"Entry Level - الأسبوع 1: Intro to Dotnet world / HTML / CSS / Browser Developer Tools", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w01-r1", title:"Codegraphia: ASP.NET Full Stack Developer كيف تصبح (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/oRzjtOJGvWA"},
          {id:"be-dotnet-entry-w01-r2", title:"The Net Ninja (HTML & CSS Crash Course) (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G"},
          {id:"be-dotnet-entry-w01-extra", title:"موارد إضافية لهذا الأسبوع: Abdelrahman Gamal (HTML Crash Course)، Abdelrahman Gamal (CSS Crash Course)، Elzero Web School (Chrome Dev Tools)، Koding 101 (Chrome Dev Tools)", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=q3yFo-t1ykw"}
        ]},
        { id:"be-dotnet-entry-w02", title:"Entry Level - الأسبوع 2: Version Control (Git & GitHub) / JS / Bootstrap", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w02-r1", title:"Issam Abdelnabi (عربي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=Jaqrcw_MB9E&list=PL4n1Qos4Tb6R4guGC4oX_PZVt8E8Xpvq"},
          {id:"be-dotnet-entry-w02-r2", title:"Traversy Media (JS) (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/hdI2bqOjy3c?si=5MYoiZW-SD9rbw8L"},
          {id:"be-dotnet-entry-w02-extra", title:"موارد إضافية لهذا الأسبوع: Abdelrahman Gamal (Bootstrap)، اكاديمية ترميز (Bootstrap)، freeCodeCamp (Git & GitHub)", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=EzHbZjXDdKc&t=2943s&pp=ygUQYm9vdHN0cmFwINi02LHYrQ%3D%3D"}
        ]},
        { id:"be-dotnet-entry-w03", title:"Level 1: Beginner - الأسبوع 1: C# basics", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w03-r1", title:"Piece of Cake Dev [1:19] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLfHpC6JZ316dbrFn-jAwMBZwMqkcAabWB&si=365JRHhKXDbOO_Pb"},
          {id:"be-dotnet-entry-w03-r2", title:"Caleb Curry (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL_c9BZzLwBRIXCJGLd4UzqH34uCclOFwC&si=aSiNr8sGyRzaBT1b"},
          {id:"be-dotnet-entry-w03-extra", title:"موارد إضافية لهذا الأسبوع: Passionate Coders، Issam Abdelnabi", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLsV97AQt78NT0H8J71qe7edwRpAirfqOI&si=hpsYMiM-s_FYrq03"}
        ]},
        { id:"be-dotnet-entry-w04", title:"Level 1: Beginner - الأسبوع 2: OOP", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w04-r1", title:"Piece of Cake Dev [1:16] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLfHpC6JZ316f6YXKyux0dHjJXA0Kg38p7&si=GC0ePTwaVyRl6i2P"},
          {id:"be-dotnet-entry-w04-r2", title:"Caleb Curry (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL_c9BZzLwBRIXCJGLd4UzqH34uCclOFwC&si=aSiNr8sGyRzaBT1b"},
          {id:"be-dotnet-entry-w04-extra", title:"موارد إضافية لهذا الأسبوع: Passionate Coders، Issam Abdelnabi", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLsV97AQt78NQumtM4rQc77yjbkZcGOTX5&si=Tt9g0qv_-93IyS0O"}
        ]},
        { id:"be-dotnet-entry-w05", title:"Level 1: Beginner - الأسبوع 3: Generics / Collections", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w05-r1", title:"Piece of Cake Dev [1:7] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLfHpC6JZ316ciHMql4eXK1zfzuttajevf&si=o-yK2YlR8m6zghOn"},
          {id:"be-dotnet-entry-w05-r2", title:"Naresh i Technologies (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLVlQHNRLflP8DCUdve6NEAfu8T6M9127i&si=NSLy58zYfkffX2ZI"},
          {id:"be-dotnet-entry-w05-extra", title:"موارد إضافية لهذا الأسبوع: Issam Abdelnabi", duration:"", type:"قراءة", videoUrl:"https://youtu.be/xE6bS6EfKAc?si=jV_K7r5jTSzlw-n6"}
        ]},
        { id:"be-dotnet-entry-w06", title:"Level 1: Beginner - الأسبوع 4: Delegates / Events / Anonymous Methods & Lambda Expressions", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w06-r1", title:"Passionate Coders [1 : 4] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLsV97AQt78NQYhO7NqlBTrJX_Nsk3SmyY&si=P38msZaLLIGpK9Zp"},
          {id:"be-dotnet-entry-w06-r2", title:"Rainer Stropek (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/nhJ63BnlP5I?si=n8nn5V6eyJ4gInDn"},
          {id:"be-dotnet-entry-w06-extra", title:"موارد إضافية لهذا الأسبوع: Piece of Cake Dev [2 & 5]", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLfHpC6JZ316dwb3MN8W6XuBuyaTA8RVaW&si=8emviHGi7AM-p8LY"}
        ]},
        { id:"be-dotnet-entry-w07", title:"Level 1: Beginner - الأسبوع 5: Asynchronous Programming", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w07-r1", title:"Passionate Coders [5 : 6] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLsV97AQt78NQYhO7NqlBTrJX_Nsk3SmyY&si=P38msZaLLIGpK9Zp"},
          {id:"be-dotnet-entry-w07-r2", title:"Rainer Stropek [1] (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/FIZVKteEFyk?si=ovnQa0fxiEa90UNb"},
          {id:"be-dotnet-entry-w07-extra", title:"موارد إضافية لهذا الأسبوع: Kudvenkat.Arabic، Issam Abdelnabi، Tural Suleymani [1]", duration:"", type:"قراءة", videoUrl:"https://youtu.be/xX_V6rgVa0Q?si=CypRzTSUIZgpci1e"}
        ]},
        { id:"be-dotnet-entry-w08", title:"Level 1: Beginner - الأسبوع 6: Records / Nulls in C# / Attributes", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w08-r1", title:"Metigator (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/N2qewr8yeuI?si=j-KwY5vcT9Kw7Bq2"},
          {id:"be-dotnet-entry-w08-extra", title:"موارد إضافية لهذا الأسبوع: Metigator، Metigator", duration:"", type:"قراءة", videoUrl:"https://youtu.be/6-AdjwK43hM?si=HATjAnrhA1vWke48"}
        ]},
        { id:"be-dotnet-entry-w09", title:"Level 1: Beginner - الأسبوع 7: SOLID Principles", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w09-r1", title:"Passionate Coders [1 : 5] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLsV97AQt78NRT1GmH2EJ-o-2_ILFM9feq&si=21B1bnrUzCpdDFhI"},
          {id:"be-dotnet-entry-w09-r2", title:"Geekific (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/HoA6aZPR5K0?si=_122DepC_-WBOwhQ"},
          {id:"be-dotnet-entry-w09-extra", title:"موارد إضافية لهذا الأسبوع: Issam Abdelnabi، Omar Ahmed", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PL4n1Qos4Tb6ThSyydEJTm7xJ3qEwE8Oyu&si=5mULtLdUI9f7Hx9b"}
        ]},
        { id:"be-dotnet-entry-w10", title:"Level 1: Beginner - الأسبوع 8: SQL", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w10-r1", title:"Mohamed El Desouki [1 : 23] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL1DUmTEdeA6J6oDLTveTt4Z7E5qEfFluE&si=kEh-mb3yRKkhbb7n"},
          {id:"be-dotnet-entry-w10-r2", title:"kudvenkat (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL08903FB7ACA1C2FB&si=Njplc1zXN5V9uyH-"},
          {id:"be-dotnet-entry-w10-extra", title:"موارد إضافية لهذا الأسبوع: catch Error", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLAowHBw9BCw5b56-SfY7tgndHbGcQycp2&si=UcStONvfyhF0DBJa"}
        ]},
        { id:"be-dotnet-entry-w11", title:"Level 1: Beginner - الأسبوع 9: SQL", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w11-r1", title:"Mohamed El Desouki [24 : 44] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL1DUmTEdeA6J6oDLTveTt4Z7E5qEfFluE&si=kEh-mb3yRKkhbb7n"},
          {id:"be-dotnet-entry-w11-r2", title:"kudvenkat (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL08903FB7ACA1C2FB&si=Njplc1zXN5V9uyH-"}
        ]},
        { id:"be-dotnet-entry-w12", title:"Level 1: Beginner - الأسبوع 10: LINQ", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w12-r1", title:"Issam Abdelnabi (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL4n1Qos4Tb6Sj1Y4xJuJoWCuqleeG2yt6&si=C2SCIEdVzFJi-fvE"},
          {id:"be-dotnet-entry-w12-r2", title:"Naresh i Technologies (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLVlQHNRLflP_-XQtkI8-EJagXRzqf7mgG&si=SfR7_MHTypVRIcwD"}
        ]},
        { id:"be-dotnet-entry-w13", title:"Level 1: Beginner - الأسبوع 11: EF Core", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w13-r1", title:"Metigator [1 & 2 & 5] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL4n1Qos4Tb6QZkbTWJx7wHqEABP8Pg6uv&si=8gyoMjhPShGQgkhH"},
          {id:"be-dotnet-entry-w13-r2", title:"Coding Tutorials (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLQB-TSatJvw4T7mQneItRgsemyjMMYRNk&si=O1e6EopYZu0KpjYc"},
          {id:"be-dotnet-entry-w13-extra", title:"موارد إضافية لهذا الأسبوع: DevCreed [1 : 37]، Issam Abdelnabi", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PL62tSREI9C-cHV28v-EqWinveTTAos8Pp&si=h0stidMFBlPc41"}
        ]},
        { id:"be-dotnet-entry-w14", title:"Level 1: Beginner - الأسبوع 12: EF Core", duration:"أسبوع", lessons:[
          {id:"be-dotnet-entry-w14-r1", title:"DevCreed [54 : 70] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL62tSREI9C-cHV28v-EqWinveTTAos8Pp&si=h0stidMFBlPc41"},
          {id:"be-dotnet-entry-w14-r2", title:"Geekific [1] (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/TS5i-uPXLs8?si=mSH0rkWCSIKvzV_N"},
          {id:"be-dotnet-entry-w14-extra", title:"موارد إضافية لهذا الأسبوع: Issam Abdelnabi", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PL4n1Qos4Tb6QZkbTWJx7wHqEABP8Pg6uv&si=BNXRAZ9ZXb2ILVUf"}
        ]},
        { id:"be-dotnet-l2-w01", title:"Level 2: Intermediate - الأسبوع 1: Design Patterns", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l2-w01-r1", title:"Passionate Coders (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLsV97AQt78NTrqUAZM562JbR3ljX19JFR&si=-wST1eOr8dMkMkET"},
          {id:"be-dotnet-l2-w01-r2", title:"Geekific (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLlsmxlJgn1HJpa28yHzkBmUY-Ty71ZUGc&si=lUHxIPCGaVkLiHGO"},
          {id:"be-dotnet-l2-w01-extra", title:"موارد إضافية لهذا الأسبوع: Issam Abdelnabi، freeCodeCamp.org [ (2:04:56) ]", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=8OitfyFqboA&list=PL4n1Qos4Tb6STYkwXrOdYxj_dlGqzozZN"}
        ]},
        { id:"be-dotnet-l2-w02", title:"Level 2: Intermediate - الأسبوع 2: MVC", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l2-w02-r1", title:"Coding-Future [1 : 20] (عربي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLPZvv4Sjz6uHtXszCb132o7Oe_T_ur2FP"},
          {id:"be-dotnet-l2-w02-r2", title:"Teddy Smith (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL82C6-O4XrHde_urqhKJHH-HTUfTK6siO&si=8KeuWSlIT-BckixF"},
          {id:"be-dotnet-l2-w02-extra", title:"موارد إضافية لهذا الأسبوع: Codographia، kudvenkat، DotNetMastery", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLX1bW_GeBRhAjpkPCTpKXJoFGe2ZpYGUC&si=ZUx9yGFbuoSJe7AE"}
        ]},
        { id:"be-dotnet-l2-w03", title:"Level 2: Intermediate - الأسبوع 3: MVC", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l2-w03-r1", title:"Codographia (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLX1bW_GeBRhAjpkPCTpKXJoFGe2ZpYGUC&si=ZUx9yGFbuoSJe7AE"},
          {id:"be-dotnet-l2-w03-r2", title:"Teddy Smith (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL82C6-O4XrHde_urqhKJHH-HTUfTK6siO&si=8KeuWSlIT-BckixF"},
          {id:"be-dotnet-l2-w03-extra", title:"موارد إضافية لهذا الأسبوع: kudvenkat، DotNetMastery", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PL6n9fhu94yhVm6S8I2xd6nYz2ZORd7X2v&si=wWDTyIFrpEhZiIIT"}
        ]},
        { id:"be-dotnet-l2-w04", title:"Level 2: Intermediate - الأسبوع 4: MVC", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l2-w04-r1", title:"Coding-Future [39:43] & 50 & [53:56] , [60:68] (عربي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLPZvv4Sjz6uHtXszCb132o7Oe_T_ur2FP"},
          {id:"be-dotnet-l2-w04-r2", title:"Teddy Smith (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL82C6-O4XrHde_urqhKJHH-HTUfTK6siO&si=8KeuWSlIT-BckixF"},
          {id:"be-dotnet-l2-w04-extra", title:"موارد إضافية لهذا الأسبوع: Codographia، kudvenkat، DotNetMastery", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLX1bW_GeBRhAjpkPCTpKXJoFGe2ZpYGUC&si=ZUx9yGFbuoSJe7AE"}
        ]},
        { id:"be-dotnet-l2-w05", title:"Level 2: Intermediate - الأسبوع 5: MVC / Identity", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l2-w05-r1", title:"Coding-Future [69 : 85] (عربي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLPZvv4Sjz6uHtXszCb132o7Oe_T_ur2FP"},
          {id:"be-dotnet-l2-w05-r2", title:"Teddy Smith (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL82C6-O4XrHde_urqhKJHH-HTUfTK6siO&si=8KeuWSlIT-BckixF"},
          {id:"be-dotnet-l2-w05-extra", title:"موارد إضافية لهذا الأسبوع: Codographia، kudvenkat، DotNetMastery", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PLX1bW_GeBRhAjpkPCTpKXJoFGe2ZpYGUC&si=ZUx9yGFbuoSJe7AE"}
        ]},
        { id:"be-dotnet-l2-w06", title:"Level 2: Intermediate - الأسبوع 6: API", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l2-w06-r1", title:"Passionate Coders [1:4] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLsV97AQt78NQ8E7cEqovH0zLYRJgJahGh&si=kMALO_VXyPWocJ0h"}
        ]},
        { id:"be-dotnet-l2-w07", title:"Level 2: Intermediate - الأسبوع 7: API", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l2-w07-r1", title:"Passionate Coders [5:10] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLsV97AQt78NQ8E7cEqovH0zLYRJgJahGh&si=kMALO_VXyPWocJ0h"}
        ]},
        { id:"be-dotnet-l2-w08", title:"Level 2: Intermediate - الأسبوع 8: API", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l2-w08-r1", title:"Passionate Coders [11:14] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLsV97AQt78NQ8E7cEqovH0zLYRJgJahGh&si=kMALO_VXyPWocJ0h"}
        ]},
        { id:"be-dotnet-l2-w09", title:"Level 2: Intermediate - الأسبوع 9: Repository Pattern", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l2-w09-r1", title:"DevCreed [1:11] (عربي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL62tSREI9C-e6nQ47brLj00iSGddiee73"}
        ]},
        { id:"be-dotnet-l2-w10", title:"Level 2: Intermediate - الأسبوع 10: Identity / Jwt Tokens", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l2-w10-r1", title:"ITI (عربي)", duration:"", type:"قراءة", videoUrl:"https://drive.google.com/drive/u/0/folders/1CazlYIq1Y36xHU-BYuvJ9w4HPk6CCECX"},
          {id:"be-dotnet-l2-w10-r2", title:"Teddy Smith (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL82C6-O4XrHcjpGzpxAVqumv2PaYGIJfz&si=NOOkAJkzjdKkuL56"},
          {id:"be-dotnet-l2-w10-extra", title:"موارد إضافية لهذا الأسبوع: DevCreed [1:11]", duration:"", type:"قراءة", videoUrl:"https://youtube.com/playlist?list=PL62tSREI9C-eYNE1Pyw0yv1tETs5V8WGd&si=ayc9RZ5_odOifkF0"}
        ]},
        { id:"be-dotnet-l2-w11", title:"Level 2: Intermediate - الأسبوع 11: Jwt Refresh Tokens / API Versioning and Documentation", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l2-w11-r1", title:"DevCreed (JWT Refresh Tokens) [1:12] (عربي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL62tSREI9C-foV0zXVpW_f0JNtTD6Wv2W"},
          {id:"be-dotnet-l2-w11-r2", title:"Code Maze (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/i6kkKBsHEJs?si=3gPprG2dpcd1hd9B"},
          {id:"be-dotnet-l2-w11-extra", title:"موارد إضافية لهذا الأسبوع: Code Maze، Milan Jovanović (API Versioning)", duration:"", type:"قراءة", videoUrl:"https://youtu.be/lml_j5ujjeQ?si=eQ-0O1g4ppvT481c"}
        ]},
        { id:"be-dotnet-l2-w12", title:"Level 2: Intermediate - الأسبوع 12: Unit Testing / Unit testing + MVC + API / Testing Advanced Techniques", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l2-w12-r1", title:"Issam Abdelnabi", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=dowaRZIJRKE&list=PL4n1Qos4Tb6RrQpmpGWALaE1PVvWR8d3A"},
          {id:"be-dotnet-l2-w12-r2", title:"Teddy Smith", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL82C6-O4XrHeyeJcI5xrywgpfbrqdkQd4"},
          {id:"be-dotnet-l2-w12-extra", title:"موارد إضافية لهذا الأسبوع: Raw Coding", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/playlist?list=PLOeFnOV9YBa4Q1a7V5jWTGG9RSpKMYTpK"}
        ]},
        { id:"be-dotnet-l3-w01", title:"Level 3: Advanced - الأسبوع 1: Background Jobs / Cancellation Token", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l3-w01-r1", title:"DevCreed [ 1 : 4 ] (عربي)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL62tSREI9C-ccQuNXXAty3Vfxi0QcqCJP&si=rCLiaiilbNv1QqdE"},
          {id:"be-dotnet-l3-w01-r2", title:"Rahul Nath [1] (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/39gIPekzpjs?si=GJLv6WdSGj2Fm0UJ"},
          {id:"be-dotnet-l3-w01-extra", title:"موارد إضافية لهذا الأسبوع: IAmTimCorey [1]", duration:"", type:"قراءة", videoUrl:"https://youtu.be/ip3Z4ZcAgA8?si=MWh2rh3cgvsBgrBe"}
        ]},
        { id:"be-dotnet-l3-w02", title:"Level 3: Advanced - الأسبوع 2: Docker", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l3-w02-r1", title:"Codegraphia (Recommended) (عربي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLX1bW_GeBRhDkTf_jbdvBbkHs2LCWVeXZ"},
          {id:"be-dotnet-l3-w02-r2", title:"Julio Casal (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/cWMztQwIQNs"}
        ]},
        { id:"be-dotnet-l3-w03", title:"Level 3: Advanced - الأسبوع 3: Caching / SignalR", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l3-w03-r1", title:"Ahmed Mohamady (SignalR) (عربي)", duration:"", type:"قراءة", videoUrl:"https://www.udemy.com/course/realtime-application-with-signalr-arabic/"},
          {id:"be-dotnet-l3-w03-r2", title:"tutorialsEU (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/MSUTojuUEX4?si=bKLlz2WpIK0KpH1o"},
          {id:"be-dotnet-l3-w03-extra", title:"موارد إضافية لهذا الأسبوع: Milan Jovanović، Milan Jovanović، Milan Jovanović، Raw Coding، Milan Jovanović، Milan Jovanović، Milan Jovanović", duration:"", type:"قراءة", videoUrl:"https://youtu.be/Tt5zIKVMMbs"}
        ]},
        { id:"be-dotnet-l3-w04", title:"Level 3: Advanced - الأسبوع 4: Advanced Entity Framework Core", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l3-w04-r1", title:"Code It Up  AMBITIONED", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLLGdqRi7N09Yv1kSFXi40dnEAJriaE8nJ&si=XhH9HKuAyUpeFO9w"}
        ]},
        { id:"be-dotnet-l3-w05", title:"Level 3: Advanced - الأسبوع 5: Configuration in ASP.NET Core / Options pattern", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l3-w05-r1", title:"Rahul Nath", duration:"", type:"فيديو", videoUrl:"https://youtu.be/5GlgHV_12-k?si=mkasth2V_jFhbB7_"},
          {id:"be-dotnet-l3-w05-r2", title:"IAmTimCorey", duration:"", type:"فيديو", videoUrl:"https://youtu.be/_iryZxv8Rxw?si=fRF8EvTH_Egv6OrE"},
          {id:"be-dotnet-l3-w05-extra", title:"موارد إضافية لهذا الأسبوع: Rahul Nath", duration:"", type:"قراءة", videoUrl:"https://youtu.be/SizJCLcjbOA?si=wrVpJl0L39HMr9wP"}
        ]},
        { id:"be-dotnet-l3-w06", title:"Level 3: Advanced - الأسبوع 6: HttpClient / Broker and Broker with External Services / Result pattern", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l3-w06-r1", title:"Felipe Gavilan", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLiG4KxH00ZpnmuSsIrQ3IGTUUfl_Gl1AH&si=uos9cz4-sCXdX_R6"},
          {id:"be-dotnet-l3-w06-r2", title:"huzcodes", duration:"", type:"فيديو", videoUrl:"https://youtu.be/MLBdUmDixw8?si=BBdMVOYo_Bq0xzWj"},
          {id:"be-dotnet-l3-w06-extra", title:"موارد إضافية لهذا الأسبوع: Result Pattern - Medium", duration:"", type:"قراءة", videoUrl:"https://medium.com/@wgyxxbf/result-pattern-a01729f42f8c"}
        ]},
        { id:"be-dotnet-l3-w07", title:"Level 3: Advanced - الأسبوع 7: Pagination, Filtration, Sorting / Mapster Or AutoMapper", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l3-w07-r1", title:"Pagination, Filtration, Sorting", duration:"", type:"فيديو", videoUrl:"https://youtu.be/X8zRvXbirMU?si=TEe0D9xp_ZwidPBJ"},
          {id:"be-dotnet-l3-w07-r2", title:"Mapster", duration:"", type:"فيديو", videoUrl:"https://youtu.be/UIslFVEHkzA?si=TFoi6vymIaCsaiMi"},
          {id:"be-dotnet-l3-w07-extra", title:"موارد إضافية لهذا الأسبوع: Code Maze (Mapster)، Automapper Template، Automapper", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=Wf7F57TTQsU&pp=ygUKTWFwc3RlciBDIw%3D%3D"}
        ]},
        { id:"be-dotnet-l3-w08", title:"Level 3: Advanced - الأسبوع 8: Rate Limiting / Specification Pattern / FastEndpoints / Benchmark in .NET", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l3-w08-r1", title:"Rate Limiting", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=bOfOo3Zsfx0"},
          {id:"be-dotnet-l3-w08-r2", title:"Specification Pattern", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=bEyBtpnCqVY"},
          {id:"be-dotnet-l3-w08-extra", title:"موارد إضافية لهذا الأسبوع: FastEndpoints، Benchmark in .NET", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=oqNu0xavAyc"}
        ]},
        { id:"be-dotnet-l3-w09", title:"Level 3: Advanced - الأسبوع 9: Clean Architecture / Vertical Slice Architecture", duration:"أسبوع", lessons:[
          {id:"be-dotnet-l3-w09-r1", title:"Clean Arch (Code Future) (عربي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLPZvv4Sjz6uECy67jbHG7QtM2nCylp4YR"},
          {id:"be-dotnet-l3-w09-r2", title:"Clean Arch (Milan Jovanović) (إنجليزي)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLYpjLpq5ZDGstQ5afRz-34o_0dexr1RGa"},
          {id:"be-dotnet-l3-w09-extra", title:"موارد إضافية لهذا الأسبوع: Vertical Slice Arch (Milan Jovanović)، Vertical Slice vs Clean Arch (Milan Jovanović)، Architecture in .NET (Code Maze)", duration:"", type:"قراءة", videoUrl:"https://youtu.be/dQdXHRkePr8"}
        ]},
        ]
      },
      {
        id:"backend-laravel-track", title:"مسار Backend بـ Laravel", subtitle:"من PHP الأساسي إلى مشروع متجر إلكتروني متكامل",
        longDesc:"مسار Laravel الكامل: يبدأ بأساسيات الويب وPHP (JSON, Regex, OOP)، ثم ERD وMySQL، فـ Design Patterns وMVC وLaravel نفسه، وينتهي بمشروع تطبيقي ضخم (Multi Vendor Store) مقسّم لـ16 خطوة تفصيلية.",
        level:"مبتدئ → متقدم", duration:"~29 خطوة تعليمية", totalLessons:40, icon:"🐘", color:"#ff2d20", coverImage:"assets/pngtree-a-hand-writing-code-on-digital-interface-with-glowing-connections-symbolizing-image_17075797.jpg",
        intro:{
          tools:[
            {name:"PHP", purpose:"لغة البرمجة الأساسية", url:"https://www.php.net/downloads"},
            {name:"Composer", purpose:"مدير حزم PHP", url:"https://getcomposer.org/download/"},
            {name:"Laravel Installer", purpose:"إنشاء مشاريع Laravel جديدة", url:"https://laravel.com/docs/installation"},
            {name:"VS Code / PhpStorm", purpose:"محرر الكود", url:"https://code.visualstudio.com/Download"}
          ],
          accounts:[
            {name:"GitHub", why:"حفظ مشاريعك ومتابعة تقدّمك", url:"https://github.com/"}
          ],
          plan:[
            {title:"Level 1: Beginner", duration:"8 خطوات", goal:"أساسيات الويب، PHP، JSON/Regex، OOP، ERD، MySQL"},
            {title:"Level 2: Intermediate", duration:"5 خطوات", goal:"Design Patterns، SOLID، MVC، مدخل Laravel"},
            {title:"Level 3: Advanced", duration:"16 خطوة", goal:"مشروع Multi Vendor Store الكامل بـ Laravel"}
          ],
          challenge:[
            {name:"Laravel Official Docs", url:"https://laravel.com/docs"},
            {name:"roadmap.sh/backend", url:"https://roadmap.sh/backend"}
          ]
        },
        courses:[
        { id:"be-laravel-l1-s01", title:"Level 1: Beginner — Entry Level (Former Level 0) (Step 1): Basics of HTML/CSS / Basics of JavaScript", duration:"—", lessons:[
          {id:"be-laravel-l1-s01-r1", title:"HTML Tutorial for Beginners", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qz0aGYrrlhU"},
          {id:"be-laravel-l1-s01-r2", title:"CSS Crash Course", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=yfoY53QXEnI"},
          {id:"be-laravel-l1-s01-extra", title:"موارد إضافية لهذه الخطوة: JavaScript Full Course، HTML Full Course، CSS Arabic", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=PkZNo7MFNFg"}
        ]},
        { id:"be-laravel-l1-s02", title:"Level 1: Beginner — Entry Level (Former Level 0) (Step 2): Git / Intro to Databases / Networking Basics", duration:"—", lessons:[
          {id:"be-laravel-l1-s02-r1", title:"Git & GitHub - Big Data", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=Q6G-J54vgKc"},
          {id:"be-laravel-l1-s02-r2", title:"What Are Databases?", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=rQKJFlsifR8"},
          {id:"be-laravel-l1-s02-extra", title:"موارد إضافية لهذه الخطوة: Networking (Arabic)، Git Crash Course، SQL vs NoSQL", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/playlist?list=PLNE3WjwctlOy1ekMfZl9AbLyFivSgsfml"}
        ]},
        { id:"be-laravel-l1-s03", title:"Level 1: Beginner — Getting Familiar with PHP (Former Level 1) (Step 1): PHP Basics (الحلقات 1 : 33)", duration:"—", lessons:[
          {id:"be-laravel-l1-s03-r1", title:"Learn PHP The Right Way (الحلقات 1 : 33)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLr3d3QYzkw2xabQRUpcZ_IBk9W50M9pe-"}
        ]},
        { id:"be-laravel-l1-s04", title:"Level 1: Beginner — Getting Familiar with PHP (Former Level 1) (Step 2): JSON, Regular Expressions (الحلقات 1 : 8 / 59 : 60)", duration:"—", lessons:[
          {id:"be-laravel-l1-s04-r1", title:"JSON + PHP (الحلقات 1 : 8 / 59 : 60)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLylMDDjFIp1Ai0nITV8-e1kr-IeOk7Qt2"},
          {id:"be-laravel-l1-s04-r2", title:"Regex (الحلقات 1 : 8 / 59 : 60)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL0eyrZgxdwhwBToawjm9faF1ixePexft-"}
        ]},
        { id:"be-laravel-l1-s05", title:"Level 1: Beginner — Getting Familiar with PHP (Former Level 1) (Step 3): OOP (الحلقات 1 : 24)", duration:"—", lessons:[
          {id:"be-laravel-l1-s05-r1", title:"OOP Arabic (الحلقات 1 : 24)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL7mt2FDjAkPdEgExp0ZNMIiW8vHI8FEK1"},
          {id:"be-laravel-l1-s05-r2", title:"OOP Tutorial (الحلقات 1 : 24)", duration:"", type:"قراءة", videoUrl:"https://www.phptutorial.net/php-oop/"}
        ]},
        { id:"be-laravel-l1-s06", title:"Level 1: Beginner — Getting Familiar with PHP (Former Level 1) (Step 4): ERD, Database Design", duration:"—", lessons:[
          {id:"be-laravel-l1-s06-r1", title:"ERD Full Lecture", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=CZ46r29kyQw"},
          {id:"be-laravel-l1-s06-r2", title:"Database Design Beginner", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=ztHopE5Wnpc"}
        ]},
        { id:"be-laravel-l1-s07", title:"Level 1: Beginner — Getting Familiar with PHP (Former Level 1) (Step 5): MySQL (الحلقات 1 : 24 / 1 : 37)", duration:"—", lessons:[
          {id:"be-laravel-l1-s07-r1", title:"MySQL EN (الحلقات 1 : 24 / 1 : 37)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLLAZ4kZ9dFpMGXTKXsBM_ZNpJwowfsP49"},
          {id:"be-laravel-l1-s07-r2", title:"MySQL AR (الحلقات 1 : 24 / 1 : 37)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLF8OvnCBlEY25O_Ql0CrgQUAc5NVYkWF2"}
        ]},
        { id:"be-laravel-l1-s08", title:"Level 1: Beginner — Getting Familiar with PHP (Former Level 1) (Step 6): Intermediate PHP, First Project (الحلقات 55 : 67)", duration:"—", lessons:[
          {id:"be-laravel-l1-s08-r1", title:"PDO Tutorial (الحلقات 55 : 67)", duration:"", type:"قراءة", videoUrl:"https://www.phptutorial.net/php-pdo/"},
          {id:"be-laravel-l1-s08-r2", title:"MySQL Notes App (الحلقات 55 : 67)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=DOsuFRnBqLU"}
        ]},
        { id:"be-laravel-l2-s01", title:"Level 2: Intermediate — Design Patterns / SOLID (Step 3): Design Pattern", duration:"—", lessons:[
          {id:"be-laravel-l2-s01-r1", title:"SOLID Principles", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLnqAlQ9hFYdflFSS4NigVB7aSoYPNwHTL"},
          {id:"be-laravel-l2-s01-r2", title:"Intro Design Patterns", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLnqAlQ9hFYdewk9UKGBcHLulZNUBpNSKJ"},
          {id:"be-laravel-l2-s01-extra", title:"موارد إضافية لهذه الخطوة: Factory Design Pattern، Singleton Design Pattern، Adapter Design Pattern، Facade Design Pattern", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=EKIl-kEMH6g&list=PLrwRNJX9gLs3oQyBoXtYimY7M5aSF0_oC&index=7"}
        ]},
        { id:"be-laravel-l2-s02", title:"Level 2: Intermediate — MVC (Updated) (Step 1): MVC 1:25", duration:"—", lessons:[
          {id:"be-laravel-l2-s02-r1", title:"PHP MVC", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAy41u35AqJUrI-H83DObUDq"}
        ]},
        { id:"be-laravel-l2-s03", title:"Level 2: Intermediate — MVC (Updated) (Step 2): MVC 26:50", duration:"—", lessons:[
          {id:"be-laravel-l2-s03-r1", title:"PHP MVC", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL3VM-unCzF8ipG50KDjnzhugceoSG3RTC"}
        ]},
        { id:"be-laravel-l2-s04", title:"Level 2: Intermediate — MVC (Updated) (Step 3): Intro to Laravel 1:15", duration:"—", lessons:[
          {id:"be-laravel-l2-s04-r1", title:"Intro to Laravel", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=1NjOWtQ7S2o&list=PL3VM-unCzF8hy47mt9-chowaHNjfkuEVz"}
        ]},
        { id:"be-laravel-l2-s05", title:"Level 2: Intermediate — MVC (Updated) (Step 4): Intro to Laravel 16:30", duration:"—", lessons:[
          {id:"be-laravel-l2-s05-r1", title:"Intro to Laravel", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=1NjOWtQ7S2o&list=PL3VM-unCzF8hy47mt9-chowaHNjfkuEVz"}
        ]},
        { id:"be-laravel-l3-s01", title:"Level 3: Advanced — Multi Vendor Store Project (Step 1): Advanced Laravel / Multi Vendor Store (After Laravel Intro 1:3)", duration:"—", lessons:[
          {id:"be-laravel-l3-s01-r1", title:"Multi Vendor Store (After Laravel Intro 1:3)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s02", title:"Level 3: Advanced — Multi Vendor Store Project (Step 2): Advanced Laravel / Multi Vendor Store (After Laravel Intro 4:7)", duration:"—", lessons:[
          {id:"be-laravel-l3-s02-r1", title:"Multi Vendor Store (After Laravel Intro 4:7)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s03", title:"Level 3: Advanced — Multi Vendor Store Project (Step 3): Advanced Laravel / Multi Vendor Store (After Laravel Intro 8:10)", duration:"—", lessons:[
          {id:"be-laravel-l3-s03-r1", title:"Multi Vendor Store (After Laravel Intro 8:10)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s04", title:"Level 3: Advanced — Multi Vendor Store Project (Step 4): Advanced Laravel / Multi Vendor Store (After Laravel Intro 11:13)", duration:"—", lessons:[
          {id:"be-laravel-l3-s04-r1", title:"Multi Vendor Store (After Laravel Intro 11:13)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s05", title:"Level 3: Advanced — Multi Vendor Store Project (Step 5): Advanced Laravel / Multi Vendor Store (After Laravel Intro 14:16)", duration:"—", lessons:[
          {id:"be-laravel-l3-s05-r1", title:"Multi Vendor Store (After Laravel Intro 14:16)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s06", title:"Level 3: Advanced — Multi Vendor Store Project (Step 6): Advanced Laravel / Multi Vendor Store (After Laravel Intro 17:19)", duration:"—", lessons:[
          {id:"be-laravel-l3-s06-r1", title:"Multi Vendor Store (After Laravel Intro 17:19)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s07", title:"Level 3: Advanced — Multi Vendor Store Project (Step 7): Advanced Laravel / Multi Vendor Store (After Laravel Intro 20:23)", duration:"—", lessons:[
          {id:"be-laravel-l3-s07-r1", title:"Multi Vendor Store (After Laravel Intro 20:23)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s08", title:"Level 3: Advanced — Multi Vendor Store Project (Step 8): Advanced Laravel / Multi Vendor Store (After Laravel Intro 24:26)", duration:"—", lessons:[
          {id:"be-laravel-l3-s08-r1", title:"Multi Vendor Store (After Laravel Intro 24:26)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s09", title:"Level 3: Advanced — Multi Vendor Store Project (Step 9): Advanced Laravel / Multi Vendor Store (After Laravel Intro 27:29)", duration:"—", lessons:[
          {id:"be-laravel-l3-s09-r1", title:"Multi Vendor Store (After Laravel Intro 27:29)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s10", title:"Level 3: Advanced — Multi Vendor Store Project (Step 10): Advanced Laravel / Multi Vendor Store (After Laravel Intro 30:32)", duration:"—", lessons:[
          {id:"be-laravel-l3-s10-r1", title:"Multi Vendor Store (After Laravel Intro 30:32)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s11", title:"Level 3: Advanced — Multi Vendor Store Project (Step 11): Advanced Laravel / Multi Vendor Store (After Laravel Intro 33:35)", duration:"—", lessons:[
          {id:"be-laravel-l3-s11-r1", title:"Multi Vendor Store (After Laravel Intro 33:35)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s12", title:"Level 3: Advanced — Multi Vendor Store Project (Step 12): Advanced Laravel / Multi Vendor Store (After Laravel Intro 36:40)", duration:"—", lessons:[
          {id:"be-laravel-l3-s12-r1", title:"Multi Vendor Store (After Laravel Intro 36:40)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s13", title:"Level 3: Advanced — Multi Vendor Store Project (Step 13): Advanced Laravel / Multi Vendor Store (After Laravel Intro 41:43)", duration:"—", lessons:[
          {id:"be-laravel-l3-s13-r1", title:"Multi Vendor Store (After Laravel Intro 41:43)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s14", title:"Level 3: Advanced — Multi Vendor Store Project (Step 14): Advanced Laravel / Multi Vendor Store (After Laravel Intro 42:44)", duration:"—", lessons:[
          {id:"be-laravel-l3-s14-r1", title:"Multi Vendor Store (After Laravel Intro 42:44)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s15", title:"Level 3: Advanced — Multi Vendor Store Project (Step 15): Advanced Laravel / Multi Vendor Store (After Laravel Intro 45:48)", duration:"—", lessons:[
          {id:"be-laravel-l3-s15-r1", title:"Multi Vendor Store (After Laravel Intro 45:48)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        { id:"be-laravel-l3-s16", title:"Level 3: Advanced — Multi Vendor Store Project (Step 16): Advanced Laravel / Multi Vendor Store (After Laravel Intro 48:51)", duration:"—", lessons:[
          {id:"be-laravel-l3-s16-r1", title:"Multi Vendor Store (After Laravel Intro 48:51)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=qiY7VGiWkVw&list=PL13Ag2mfco64zMLcFjPb5GVWCu-OAjTrx&index=4"}
        ]},
        ]
      },
      {
        id:"backend-spring-track", title:"مسار Backend بـ Spring (Java)", subtitle:"من Git إلى أنظمة Microservices متكاملة بجافا",
        longDesc:"مسار Spring (Java) الكامل: يبدأ بـ Git والويب الأساسي، ثم Java وOOP، فـ Spring Boot وSpring Core (AOP/IoC/DI)، فالمصادقة والتحقق، فقواعد البيانات وRedis، وينتهي بمواضيع متقدمة (GraphQL, Kafka, Microservices, System Design). 35 أسبوع على 3 مستويات.",
        level:"مبتدئ → متقدم", duration:"35 أسبوع (~8 أشهر)", totalLessons:128, icon:"🍃", color:"#6db33f", coverImage:"assets/pngtree-a-hand-writing-code-on-digital-interface-with-glowing-connections-symbolizing-image_17075797.jpg",
        intro:{
          tools:[
            {name:"JDK (Java Development Kit)", purpose:"بيئة تشغيل وتطوير Java", url:"https://www.oracle.com/java/technologies/downloads/"},
            {name:"IntelliJ IDEA", purpose:"بيئة تطوير Java المفضّلة", url:"https://www.jetbrains.com/idea/download/"},
            {name:"Spring Initializr", purpose:"إنشاء مشاريع Spring Boot جديدة", url:"https://start.spring.io/"},
            {name:"Postman", purpose:"اختبار الـ APIs", url:"https://www.postman.com/downloads/"}
          ],
          accounts:[
            {name:"GitHub", why:"حفظ مشاريعك ومتابعة تقدّمك", url:"https://github.com/"}
          ],
          plan:[
            {title:"Level 1: Beginner", duration:"10 أسابيع", goal:"Git، الويب الأساسي، Java، OOP، Spring Boot، أول مشروع"},
            {title:"Level 2: Intermediate", duration:"15 أسبوع", goal:"Spring Core، التحقق، المصادقة، مشاريع E-Commerce وChat"},
            {title:"Level 3: Advanced", duration:"10 أسابيع", goal:"المدفوعات، GraphQL، Caching، Microservices، نظام متكامل"}
          ],
          challenge:[
            {name:"Spring Official Guides", url:"https://spring.io/guides"},
            {name:"roadmap.sh/backend", url:"https://roadmap.sh/backend"}
          ]
        },
        courses:[
        { id:"be-spring-l1-w01", title:"Level 1: Beginner - الأسبوع 1: Introduction to Version Control with Git", duration:"أسبوع", lessons:[
          {id:"be-spring-l1-w01-r1", title:"Git and GitHub for Beginners (FreeCodeCamp.org)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=RGOj5yH7evk"},
          {id:"be-spring-l1-w01-r2", title:"Git and GitHub Tutorial for Beginners (Kevin Stratvert)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=tRZGeaHPoaw"},
          {id:"be-spring-l1-w01-extra", title:"موارد إضافية لهذا الأسبوع: Git and Github (Big Data)", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=Q6G-J54vgKc"},
          {id:"be-spring-l1-w01-task", title:"مهمة الأسبوع: Setup your GitHub account and upload your first repository.", duration:"", type:"تدريب", videoUrl:"https://www.youtube.com/watch?v=RGOj5yH7evk"}
        ]},
        { id:"be-spring-l1-w02", title:"Level 1: Beginner - الأسبوع 2: Basic HTML, CSS, and JS for the Front-end", duration:"أسبوع", lessons:[
          {id:"be-spring-l1-w02-r1", title:"HTML5 and CSS3 (SuperSimpleDev)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/G3e-cpL7ofc?si=nkOWX7S6EwYhBta1"},
          {id:"be-spring-l1-w02-r2", title:"HTML5 and CSS3 (FreeCodeCamp.org)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/mU6anWqZJcc?si=1MvHczhsZxkgS_pO"},
          {id:"be-spring-l1-w02-extra", title:"موارد إضافية لهذا الأسبوع: JavaScipt Basics (Mosh)، Build a Simple Portfolio Front-end (WEB CIFAR)، Build a Simple To-Do List Front-end (Web Dev Simplified)، HTML (W3Schools)، HTML (MDN)، CSS (W3Schools)، CSS (MDN)", duration:"", type:"قراءة", videoUrl:"https://youtu.be/W6NZfCO5SIk?si=B2J2hKqugXf_sTS1"},
          {id:"be-spring-l1-w02-task", title:"مهمة الأسبوع: Build a simple front-end for a website of your choice (portfolio, to-do list app, blog, etc).", duration:"", type:"تدريب", videoUrl:"https://youtu.be/G3e-cpL7ofc?si=nkOWX7S6EwYhBta1"}
        ]},
        { id:"be-spring-l1-w03", title:"Level 1: Beginner - الأسبوع 3: Basics of Web Development", duration:"أسبوع", lessons:[
          {id:"be-spring-l1-w03-r1", title:"Network Fundamentals for Web Developers", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLCy5RQkQgvf4yaL-AMDO8rpAAi90sWfGl"},
          {id:"be-spring-l1-w03-r2", title:"Cisco CCNA 200-301", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLF1hDMPPRqGxpYdo0ctaa7MxfOi9vjs1u"},
          {id:"be-spring-l1-w03-extra", title:"موارد إضافية لهذا الأسبوع: OSI Layers (Metwally Labs)، What is a REST API?، HTTP Internals (Zkrallah)، HTTP (W3Schools)، HTTP Messages (MDN)", duration:"", type:"قراءة", videoUrl:"https://youtu.be/A31bxOyj5mk?si=BbKU-ebPy2sD7LqB"},
          {id:"be-spring-l1-w03-task", title:"مهمة الأسبوع: 1- Write a document explaining how a REST API works and how clients and servers communicate through HTTP. 2- Build a simple HTTP client program that performs GET, POST requests to some online fake API.", duration:"", type:"تدريب", videoUrl:"https://www.youtube.com/playlist?list=PLCy5RQkQgvf4yaL-AMDO8rpAAi90sWfGl"}
        ]},
        { id:"be-spring-l1-w04", title:"Level 1: Beginner - الأسبوع 4: Introduction to Programming", duration:"أسبوع", lessons:[
          {id:"be-spring-l1-w04-r1", title:"Java Basics (GeeksForGeeks)", duration:"", type:"قراءة", videoUrl:"https://www.geeksforgeeks.org/java/"},
          {id:"be-spring-l1-w04-r2", title:"Java Basics Crash Course (FreeCodeCamp.org)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=GdzRzWymT4c&t=25s"},
          {id:"be-spring-l1-w04-extra", title:"موارد إضافية لهذا الأسبوع: Java Beginners (Playlist by Bro Code)، Java Full Course (Bro Code)، Java Full Course for Beginners (Mosh)، Learn Java Programming From Scratch in Arabic (Adel Nasim)، Java Tutorial for Beginners (Telusko)، Java (W3Schools)", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/playlist?list=PLZPZq0r_RZOOj_NOZYq_R2PECIMglLemc"},
          {id:"be-spring-l1-w04-task", title:"مهمة الأسبوع: 1- Write simple programs like calculating the sum of numbers or finding the largest number in an array. 2- Implement basic binary search in Java. 3- Try to solve some Leetcode easy questions using Java.", duration:"", type:"تدريب", videoUrl:"https://www.geeksforgeeks.org/java/"}
        ]},
        { id:"be-spring-l1-w05", title:"Level 1: Beginner - الأسبوع 5: Object-Oriented Programming (OOP)", duration:"أسبوع", lessons:[
          {id:"be-spring-l1-w05-r1", title:"Java OOP Concepts (GeeksforGeeks)", duration:"", type:"قراءة", videoUrl:"https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/"},
          {id:"be-spring-l1-w05-r2", title:"Introduction to OOP (Mosh)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/pTB0EiLXUC8?si=Cwy9pzQIeTAqdvuI"},
          {id:"be-spring-l1-w05-extra", title:"موارد إضافية لهذا الأسبوع: Introduction to OOP (FreeCodeCamp.org)، Java OOP (Caleb Curry)، OOP in Java (Telusko)، OOP in Java (Adel Nasim)", duration:"", type:"قراءة", videoUrl:"https://youtu.be/SiBw7os-_zI?si=odVcb7Cx78TxrR0X"},
          {id:"be-spring-l1-w05-task", title:"مهمة الأسبوع: 1- Create a basic student management system with classes for Student and Course. 2- Shapes Task", duration:"", type:"تدريب", videoUrl:"https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/"}
        ]},
        { id:"be-spring-l1-w06", title:"Level 1: Beginner - الأسبوع 6: Java Essentials for Spring Boot", duration:"أسبوع", lessons:[
          {id:"be-spring-l1-w06-r1", title:"Spring Boot Build Tool Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems"},
          {id:"be-spring-l1-w06-r2", title:"Maven in 10 minutes", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=bBqxC43ASsM"},
          {id:"be-spring-l1-w06-extra", title:"موارد إضافية لهذا الأسبوع: Introduction to Maven، Maven Tutorial (6:12~)، Java Files (Coding With John)، Java Collections، Java Collections (Jakob Jenkov)، Apache Maven Tutorial (Baeldung)، Maven (GeeksForGeeks)، Java Files (W3Schools)", duration:"", type:"قراءة", videoUrl:"https://www.youtube.com/watch?v=bSaBmXFym30"},
          {id:"be-spring-l1-w06-task", title:"مهمة الأسبوع: Create a Java application to manage a library system using ArrayList.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems"}
        ]},
        { id:"be-spring-l1-w07", title:"Level 1: Beginner - الأسبوع 7: Introduction to Spring Boot", duration:"أسبوع", lessons:[
          {id:"be-spring-l1-w07-r1", title:"Spring Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/"},
          {id:"be-spring-l1-w07-r2", title:"What is Spring Boot? (Telusko)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/L0v_3MzC1io?si=-Zd_KV1llMlKtvm-"},
          {id:"be-spring-l1-w07-extra", title:"موارد إضافية لهذا الأسبوع: Spring Boot Documentation، Building a RESTful Web Service، Spring Boot Tutorial (Amigoscode)، The Ultimate Guide to Spring Boot (Devtiro)، Spring Boot Tutorial Crash Course (Marco Codes)، Spring Boot Tutorial (GeeksForGeeks)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-boot/"},
          {id:"be-spring-l1-w07-task", title:"مهمة الأسبوع: Create a simple REST API to manage books.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-framework/reference/"}
        ]},
        { id:"be-spring-l1-w08", title:"Level 1: Beginner - الأسبوع 8: Database Basics with MySQL and PostgreSQL", duration:"أسبوع", lessons:[
          {id:"be-spring-l1-w08-r1", title:"Database Introduction (ByteByteGo)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLCRMIe5FDPsdnSszazqVIQFh99t1ExH19"},
          {id:"be-spring-l1-w08-r2", title:"MySQL Tutorial 1 (Fireship)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/Cz3WcZLRaWc?si=CfB3po-zsdlbV678"},
          {id:"be-spring-l1-w08-extra", title:"موارد إضافية لهذا الأسبوع: MySQL Tutorial 2 (NetworkChuck)، PostgreSQL Tutorial (FreeCodeCamp.org)، SQLZoo Interactive Quizes، PostgreSQL Tutorials (Neon)، Advanced SQL Tutorial (Mode Analytics)", duration:"", type:"قراءة", videoUrl:"https://youtu.be/xiUTqnI6xk8?si=iLejnmfNfXbcdYBF"},
          {id:"be-spring-l1-w08-task", title:"مهمة الأسبوع: 1- Create a database for the book management system. 2- Try to solve some easy SQL questions on HackerRank or Leetcode.", duration:"", type:"تدريب", videoUrl:"https://www.youtube.com/playlist?list=PLCRMIe5FDPsdnSszazqVIQFh99t1ExH19"}
        ]},
        { id:"be-spring-l1-w09", title:"Level 1: Beginner - الأسبوع 9: Integrating Spring Boot with PostgreSQL & Spring Data JPA", duration:"أسبوع", lessons:[
          {id:"be-spring-l1-w09-r1", title:"Spring Boot Data Access Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-boot/reference/data/index.html"},
          {id:"be-spring-l1-w09-r2", title:"Spring JPA Tutorial (Amigoscode)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=8SGI_XS5OPw&t=2364s"},
          {id:"be-spring-l1-w09-extra", title:"موارد إضافية لهذا الأسبوع: Spring Data JPA Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-data/jpa/reference/index.html"},
          {id:"be-spring-l1-w09-task", title:"مهمة الأسبوع: Enhance the book management system with a PostgreSQL database.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-boot/reference/data/index.html"}
        ]},
        { id:"be-spring-l1-w10", title:"Level 1: Beginner - الأسبوع 10: Building a Student Management System", duration:"أسبوع", lessons:[
          {id:"be-spring-l1-w10-project", title:"مشروع الأسبوع: Build a Student Management System with REST APIs and PostgreSQL.", duration:"", type:"مشروع", videoUrl:"https://roadmap.sh/backend"}
        ]},
        { id:"be-spring-l2-w11", title:"Level 2: Intermediate - الأسبوع 11: Spring Core (AOP, IoC, and DI)", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w11-r1", title:"Spring Core Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/core.html"},
          {id:"be-spring-l2-w11-r2", title:"Dependency Injection (Yehia Tech)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/ttza41X-O6k?si=gC4w2oNyL-0HUNTf"},
          {id:"be-spring-l2-w11-extra", title:"موارد إضافية لهذا الأسبوع: Spring IoC Documentation، Spring Beans and DI (Maaike)، Spring IoC & DI (Telusko)، Dependency Injection in Spring Boot (Telusko)، Autowire in Spring Boot (Telusko)، Spring Configuration (Code Java)، Introduction to Spring Framework (GeeksforGeeks)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/core/beans.html"},
          {id:"be-spring-l2-w11-task", title:"مهمة الأسبوع: Apply what you understood to the Student Management System or revisit what you already did for dependency injection.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-framework/reference/core.html"}
        ]},
        { id:"be-spring-l2-w12", title:"Level 2: Intermediate - الأسبوع 12: Validation and Error Handling", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w12-r1", title:"Spring Exceptions Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-exceptionhandler.html"},
          {id:"be-spring-l2-w12-r2", title:"Java Exceptions (Coding With John)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/1XAfapkBQjk?si=C3_nKYdqbD0TmqNj"},
          {id:"be-spring-l2-w12-extra", title:"موارد إضافية لهذا الأسبوع: Spring ControllerAdvice Documentation، Spring Validation Documentation، Spring Validation Form Input Documentation، Validation in Spring Boot (Java Techie)، Spring Exception Handling (CodeSnippet)، Spring Input Validation (Fast & Simple Dev)، Spring Validation (Baeldung)، Spring Validation (GeeksforGeeks)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-advice.html"},
          {id:"be-spring-l2-w12-task", title:"مهمة الأسبوع: Add validation to the Student Management System and create custom error messages for invalid inputs.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-exceptionhandler.html"}
        ]},
        { id:"be-spring-l2-w13", title:"Level 2: Intermediate - الأسبوع 13: Testing in Spring Boot", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w13-r1", title:"Spring Testing Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/testing.html"},
          {id:"be-spring-l2-w13-r2", title:"Unit vs Int Testing Intro (Dan Vega)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/pNiRNRgi5Ws?si=-SMzaUukHOHGe-97"},
          {id:"be-spring-l2-w13-extra", title:"موارد إضافية لهذا الأسبوع: Spring Boot Testing Documentation، Spring Boot Unit Testing (Teddy)، Spring Boot Testing (Amigoscode)، Setup Swagger 2 in Spring Boot (KB Tutorials)، Testing in Spring Boot (Baeldung)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-boot/reference/testing/index.html"},
          {id:"be-spring-l2-w13-task", title:"مهمة الأسبوع: Write unit tests for services and controllers, and integration tests for the database layer.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-framework/reference/testing.html"}
        ]},
        { id:"be-spring-l2-w14", title:"Level 2: Intermediate - الأسبوع 14: Filters & Interceptors, Lombok, Pagination & Filtering, File Uploads", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w14-r1", title:"Spring Filters Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/web/webmvc/filters.html"},
          {id:"be-spring-l2-w14-r2", title:"Spring Filter Series (Sergey Tech)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLrHjhj3I5M_ljv8s-Bejj4tbYPjOnjwQp&si=yugB_pYcNNg_Rpbb"},
          {id:"be-spring-l2-w14-extra", title:"موارد إضافية لهذا الأسبوع: Spring Interceptors Documentation، Spring Boot File Upload Documentation، Spring Boot Interceptors (CodeSnippet)، Lombok Tutorial (Amigoscode)، Spring Boot File Upload & Download (Java Techie)، Spring Boot File Upload & Download (Telusko)، Pagination in Spring Boot (Teddy)، Pagination and Sorting in Spring Boot (Java Techie)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-config/interceptors.html"},
          {id:"be-spring-l2-w14-task", title:"مهمة الأسبوع: 1- Add logging feature to the students' management system using filters once and using interceptors once. 2- Add the pagination feature to the students' management system. 3- Add lombok annotations to the students' management system. 4- Create a simple Spring Boot application that allows users to upload files using multipart requests and stores them in the local file system (or database for learning purposes).", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-framework/reference/web/webmvc/filters.html"}
        ]},
        { id:"be-spring-l2-w15", title:"Level 2: Intermediate - الأسبوع 15: Introduction to Spring Security (Part 1)", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w15-r1", title:"Spring Security Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-security/reference/index.html"},
          {id:"be-spring-l2-w15-r2", title:"Authentication vs Authorization & Security Concepts (Java Brains)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=I0poT4UxFxE"},
          {id:"be-spring-l2-w15-extra", title:"موارد إضافية لهذا الأسبوع: Spring Boot Security Documentation، Spring Boot Basic Authentication (Lazy Programmer)، Role-based Access Control (Lazy Programmer)، Spring Security (Lazy Programmer) (start from end to start)، Spring Security Basics (Java Brains)، CORS in Spring (Telusko)، session-based Authentication (Baeldung)، Basic Authentication (Baeldung)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-boot/reference/web/spring-security.html#web.security"},
          {id:"be-spring-l2-w15-task", title:"مهمة الأسبوع: 1- Implement basic authentication in your Spring Boot application. * Use httpBasic() in your security configuration. * Test the secured endpoints using Postman. 2- Implement session-based authentication. * Configure formLogin() for session management. * Use HttpSession to store user-specific data. 3- Configure role-based access control (e.g., allow only admins to delete resources). 4- Test the secured endpoints using Postman.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-security/reference/index.html"}
        ]},
        { id:"be-spring-l2-w16", title:"Level 2: Intermediate - الأسبوع 16: Spring Security (Part 2): JWT and OAuth2", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w16-r1", title:"Spring Security Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-security/reference/index.html"},
          {id:"be-spring-l2-w16-r2", title:"Spring Security (Lazy Programmer) (start from end to start)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLOktGWstEblrgb_rNddv3HGaazetE3t1A&si=AjT0vZs2OOBOVoq1"},
          {id:"be-spring-l2-w16-extra", title:"موارد إضافية لهذا الأسبوع: Spring Security OAuth2 Documentation، Spring Boot Security Documentation، Spring Security Basics (Java Brains)، JWT & OAuth2 with Spring Security (Telusko)، JWT Authentication (Baeldung)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html"},
          {id:"be-spring-l2-w16-task", title:"مهمة الأسبوع: 1- Implement JWT-based authentication in your Spring Boot application. * Generate and validate JWTs. * Add a refresh token mechanism for token renewal. 2- Secure your REST APIs with role-based access using JWT. 3- Integrate OAuth2 with a provider like Google or GitHub. 4- Test the secured endpoints using Postman.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-security/reference/index.html"}
        ]},
        { id:"be-spring-l2-w17", title:"Level 2: Intermediate - الأسبوع 17: Sending Messages to Users via E-mail & SMS", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w17-r1", title:"Spring Email Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/integration/email.html"},
          {id:"be-spring-l2-w17-r2", title:"Setup Gmail SMTP Server", duration:"", type:"فيديو", videoUrl:"https://youtu.be/kTcmbZqNiGw?si=rHu155NGP6VkaAZ9"},
          {id:"be-spring-l2-w17-extra", title:"موارد إضافية لهذا الأسبوع: Spring Boot Email Documentation، Send SMS in Your Spring Boot App Documentation، Sending E-mails in Spring Boot، SMS via Twilio in Spring Boot (Amigoscode)، Spring Email (Baeldung)، Spring Email (GeeksForGeeks)، Spring SMS with Twilio (GeeksForGeeks)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-boot/reference/io/email.html"},
          {id:"be-spring-l2-w17-task", title:"مهمة الأسبوع: 1- Configure a Gmail SMTP and write the email sending service. 2- Create a simple email verification service by sending an OTP to the given email.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-framework/reference/integration/email.html"}
        ]},
        { id:"be-spring-l2-w18", title:"Level 2: Intermediate - الأسبوع 18: More SQL Databases and Hibernate ORM", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w18-r1", title:"Hibernate Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.jboss.org/hibernate/orm/6.6/introduction/html_single/Hibernate_Introduction.html"},
          {id:"be-spring-l2-w18-r2", title:"Hibernate and JPA Tutorial (Marco)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/xHminZ9Dxm4?si=O1FXR-ga9GZb8KtL"},
          {id:"be-spring-l2-w18-extra", title:"موارد إضافية لهذا الأسبوع: Spring Hibernate Documentation، SQL Joins Animated + Practice (Anton)، Learn SQL Joins (Decomplexify)، Aggregate Functions in SQL (Bro Code)، Aggregate Functions in SQL (Becoming a Data Scientist)، Advanced Aggregate Functions in SQL (Becoming a Data Scientist)، Database Normalization (Decomplexify)، Advanced SQL Tutorial (Mode Analytics)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/data-access/orm/hibernate.html"},
          {id:"be-spring-l2-w18-task", title:"مهمة الأسبوع: Solve SQL problems on HackerRank or Leetcode.", duration:"", type:"تدريب", videoUrl:"https://docs.jboss.org/hibernate/orm/6.6/introduction/html_single/Hibernate_Introduction.html"}
        ]},
        { id:"be-spring-l2-w19", title:"Level 2: Intermediate - الأسبوع 19: Building an E-Commerce Website Backend", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w19-project", title:"مشروع الأسبوع: In this project, you will build the backend of an E-Commerce website using Spring Boot. The backend should expose REST APIs for managing users, products, orders, and authentication. You will also implement security features, including JWT authentication and email verification, and enhance the system with pagination, filtration, file uploads, input validation, and exception handling.", duration:"", type:"مشروع", videoUrl:"https://roadmap.sh/backend"}
        ]},
        { id:"be-spring-l2-w20", title:"Level 2: Intermediate - الأسبوع 20: Introduction to NoSQL Databases", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w20-r1", title:"Getting Started with Spring Data MongoDB Documentation", duration:"", type:"قراءة", videoUrl:"https://spring.io/guides/gs/accessing-data-mongodb"},
          {id:"be-spring-l2-w20-r2", title:"Install MongoDB & mongosh on Windows (Amit Thinks)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/1LiZRYzgM2o?si=isJpU8C-Nk3-NhEE"},
          {id:"be-spring-l2-w20-extra", title:"موارد إضافية لهذا الأسبوع: Getting started with MongoDB and Spring Boot Documentation، Spring Data JPA Documentation، Complete MongoDB Tutorial (The Net Ninja)، Switch to NoSQL, move FASTER (Devtiro)، MongoDB in 1 Hour (Bro Code)، MongoDB in 30 Minutes (Web Deve Simplified)، MongoDB in Spring Boot Low-Level Tutorial (Telusko)، MongoDB in Spring Boot Tutorial (Amigoscode) (26:23~)", duration:"", type:"قراءة", videoUrl:"https://www.mongodb.com/en-us/resources/products/compatibilities/spring-boot"},
          {id:"be-spring-l2-w20-task", title:"مهمة الأسبوع: 1- Build a simple CRUD application of your choice (task manager, profile manager, books manager, etc) with Spring Data MongoDB. 2- Implement pagination and sorting in MongoDB queries. 3- Implement a search feature using MongoDB’s text indexes.", duration:"", type:"تدريب", videoUrl:"https://spring.io/guides/gs/accessing-data-mongodb"}
        ]},
        { id:"be-spring-l2-w21", title:"Level 2: Intermediate - الأسبوع 21: Introduction to Asynchronous Programming in Spring Boot", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w21-r1", title:"Creating Asynchronous Methods in Spring Boot Documentation", duration:"", type:"قراءة", videoUrl:"https://spring.io/guides/gs/async-method"},
          {id:"be-spring-l2-w21-r2", title:"Blocking vs Non-blocking Programming (Zkrallah)", duration:"", type:"قراءة", videoUrl:"https://medium.com/@muhammad.heshamyt/introduction-to-blocking-vs-non-blocking-programming-e6f7f0c106db"},
          {id:"be-spring-l2-w21-extra", title:"موارد إضافية لهذا الأسبوع: A Theoretical Guide to Java CompletableFuture (Geekific)، Java CompletableFuture (Lemubit)، CompletableFuture in Java Part I (Tech Recipes)، CompletableFuture in Java Part II (Tech Recipes)، @Async & @EnableAsync in Spring Boot (Java Techie) (recommended)، @Async & @EnableAsync in Spring Boot (Java Techie) (older but good version)، CompletableFuture Guide (GeeksforGeeks)، Parallelism vs Concurrency (GeeksforGeeks)", duration:"", type:"قراءة", videoUrl:"https://youtu.be/xpjvY45Hbyg?si=eMMyf4FUU-C54Vk2"},
          {id:"be-spring-l2-w21-task", title:"مهمة الأسبوع: 1- Create a method that performs a long-running task asynchronously using CompletableFuture. * Apply what you have learned using `runAsync` and `supplyAsync`. * Apply what you have learned using `thenAccept`, `thenApply`, and `thenRun`. * Run multiple CompletableFuture tasks in parallel and combine their results. 2- Implement a Spring Boot service with an @Async annotated method. 3- Redo the above task but this time configure a custom thread pool executor.", duration:"", type:"تدريب", videoUrl:"https://spring.io/guides/gs/async-method"}
        ]},
        { id:"be-spring-l2-w22", title:"Level 2: Intermediate - الأسبوع 22: Introduction to Spring WebFlux, Spring Data R2DBC, Reactive Programming in Spring Boot", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w22-r1", title:"Web on Reactive Stack Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/web-reactive.html"},
          {id:"be-spring-l2-w22-r2", title:"What is Spring WebFlux and When to Use It? (Defog)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/M3jNn3HMeWg?si=aZApNefpQ1IkBglh"},
          {id:"be-spring-l2-w22-extra", title:"موارد إضافية لهذا الأسبوع: Spring WebFlux Documentation، Spring WebFlux Annotation-based Model Documentation، Spring WebFlux Functional Model Documentation، Spring Data R2DBC Documentation، Spring WebFlux (Code With Dilip)، Spring WebFlux (Java Techie)، Spring Boot WebFlux CRUD Tutorial with R2DBC (Genka)، Spring Boot WebFlux CRUD Tutorial with R2DBC (Bouali)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/web/webflux.html"},
          {id:"be-spring-l2-w22-task", title:"مهمة الأسبوع: 1- Create a Spring WebFlux REST API: * Set up a Spring Boot project with WebFlux. * Create a simple reactive endpoint that returns a Mono<String> and a Flux<String>. * Test the API using Postman. 2- Implement a Reactive CRUD API with WebFlux: * Create a Product entity and a corresponding ProductController. * Implement CRUD operations using Mono and Flux. * Use a reactive database (PostgreSQL + R2DBC for example). 3- Spring WebFlux Functional API: * Implement the same CRUD API using the functional programming model (instead of the annotation-based approach). 4- Create a Spring MVC REST API: * Recreate the REST API you did in the first task using Spring MVC instead of Spring WebFlux. * Add logs in both projects. * Observe the thread names handling each request.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-framework/reference/web-reactive.html"}
        ]},
        { id:"be-spring-l2-w23", title:"Level 2: Intermediate - الأسبوع 23: Caching and Introduction to Redis Cache in Spring Boot", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w23-r1", title:"Spring Boot Caching Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-boot/reference/io/caching.html#io.caching"},
          {id:"be-spring-l2-w23-r2", title:"Caching Simply Explained (Simply Explained)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/6FyXURRVmR0?si=1_bIHY6C6BvEgMvF"},
          {id:"be-spring-l2-w23-extra", title:"موارد إضافية لهذا الأسبوع: Spring Data Redis Documentation، Spring Redis Documentation، Spring Data Reactive Redis Guide Documentation، How Does Caching Work on the Backend (Software Developer Diaries)، Spring Data Redis in Spring Boot (Developer Hut)، Redis in Spring Boot Low-Level Tutorial (Java Codeex)، Spring Data Redis Part I (Java Techie)، Spring Data Redis Part II (Java Techie)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-data/redis/reference/"},
          {id:"be-spring-l2-w23-task", title:"مهمة الأسبوع: 1- Install and run a Redis server locally. 2- Integrate Redis into a Spring Boot Application: * Create a service class with methods that fetch data (e.g., from a database or an external API). * Annotate methods with @Cacheable to cache their results. * Use @CacheEvict and @CachePut annotations where appropriate to manage cache entries.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-boot/reference/io/caching.html#io.caching"}
        ]},
        { id:"be-spring-l2-w24", title:"Level 2: Intermediate - الأسبوع 24: Real-Time Communication with Sockets & Socket.IO, Streaming with WebRTC Basics.", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w24-r1", title:"Socket.io Documentation", duration:"", type:"قراءة", videoUrl:"https://socket.io/docs/v4/"},
          {id:"be-spring-l2-w24-r2", title:"Raw Socket Programming Simplest Chat Service (Zkrallah)", duration:"", type:"قراءة", videoUrl:"https://medium.com/@muhammad.heshamyt/introduction-to-raw-socket-programming-and-implementing-the-simplest-chat-service-java-17a014703f5f"},
          {id:"be-spring-l2-w24-extra", title:"موارد إضافية لهذا الأسبوع: Socket.io Wiki Documentation، Using WebSocket to Build an Interactive Web Application Documentation، WebSockets Tutorial with Socket.IO (FreeCodeCamp.org)، WebSocket Tutorial with Spring Boot (Bouali)، How Does WebRTC Work? (heyletscode)، WebRTC in 100 Seconds and Beyond (Fireship)، Building a Full Video Call App with ZegoCloud (Bouali)، WebRTC Crash Course in JavaScipt (Hussein Nasser)", duration:"", type:"قراءة", videoUrl:"https://github.com/mrniko/netty-socketio/wiki"},
          {id:"be-spring-l2-w24-task", title:"مهمة الأسبوع: 1- Implement a Real-Time Chat Application: * Set up a Spring Boot project. * Integrate Socket.IO to handle real-time communication. * Create a simple chat interface where multiple users can send and receive messages instantly. * Test the application with a basic front-end or using postman to ensure messages are transmitted in real-time. 2- Explore WebRTC Basics: * Understand the fundamentals of WebRTC and its use cases. * Set up a basic peer-to-peer connection between two clients using WebRTC. * Transmit simple data (e.g., text messages) between the peers.", duration:"", type:"تدريب", videoUrl:"https://socket.io/docs/v4/"}
        ]},
        { id:"be-spring-l2-w25", title:"Level 2: Intermediate - الأسبوع 25: Building a Real-Time Chat Application", duration:"أسبوع", lessons:[
          {id:"be-spring-l2-w25-project", title:"مشروع الأسبوع: In this project, you will build a real-time chat application using Spring WebFlux and MongoDB. The application will support private messaging between users, real-time communication using WebSockets (Socket.IO), and persistent chat history storage in MongoDB.", duration:"", type:"مشروع", videoUrl:"https://roadmap.sh/backend"}
        ]},
        { id:"be-spring-l3-w26", title:"Level 3: Advanced - الأسبوع 26: Payments and Stripe Payment Gateway", duration:"أسبوع", lessons:[
          {id:"be-spring-l3-w26-r1", title:"Stripe Official Documentation", duration:"", type:"قراءة", videoUrl:"https://stripe.com/docs"},
          {id:"be-spring-l3-w26-r2", title:"Stripe Payment Gateway Integration with Spring Boot (Java Techie)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/BczS-wbxgp4?si=22MPN7-1CcD6WvhP"},
          {id:"be-spring-l3-w26-extra", title:"موارد إضافية لهذا الأسبوع: PayPal Integration with Spring Boot (Bouali)", duration:"", type:"قراءة", videoUrl:"https://youtu.be/_eTcseS410E?si=qZdhVtkuxg3AS3dM"},
          {id:"be-spring-l3-w26-task", title:"مهمة الأسبوع: 1- Set up a Stripe account and create API keys. 2- Integrate Stripe in a Spring Boot application to process payments. 3- Implement an endpoint for handling one-time payments.", duration:"", type:"تدريب", videoUrl:"https://stripe.com/docs"}
        ]},
        { id:"be-spring-l3-w27", title:"Level 3: Advanced - الأسبوع 27: Building GraphQL Services", duration:"أسبوع", lessons:[
          {id:"be-spring-l3-w27-r1", title:"Spring for GraphQL Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-graphql/reference/index.html"},
          {id:"be-spring-l3-w27-r2", title:"What Is GraphQL? REST vs. GraphQL (ByteByteGo)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/yWzKJPw_VzM?si=Fi7ELyuHuwW2afyp"},
          {id:"be-spring-l3-w27-extra", title:"موارد إضافية لهذا الأسبوع: Spring Boot for GraphQL Documentation، Building a GraphQL Service Documentation، Observing GraphQL in action Documentation، GraphQL Explained in 100 Seconds (Fireship)، Introduction to Spring GraphQL with Spring Boot (Spring Academy)، Spring Boot and GraphQL Tutorial (Amigoscode)، Mastering GraphQL & Spring Boot APIs (Java Techie)، Master Graphql with Spring Boot (Daily Code Buffer)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-boot/reference/web/spring-graphql.html"},
          {id:"be-spring-l3-w27-task", title:"مهمة الأسبوع: 1. Set up a GraphQL server using Spring Boot and Spring GraphQL. 2. Define GraphQL schemas for a simple application (Users and Posts for example). 3. Implement queries to fetch data and mutations to modify data. 4. Integrate Spring Data JPA to fetch data from a relational database. 5. Implement error handling for invalid requests. 6. Test GraphQL APIs using GraphiQL or Postman.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-graphql/reference/index.html"}
        ]},
        { id:"be-spring-l3-w28", title:"Level 3: Advanced - الأسبوع 28: Introduction to Firebase Services", duration:"أسبوع", lessons:[
          {id:"be-spring-l3-w28-r1", title:"Firebase Cloud Messaging Documentation", duration:"", type:"قراءة", videoUrl:"https://firebase.google.com/docs/cloud-messaging"},
          {id:"be-spring-l3-w28-r2", title:"Firebase in 100 Seconds (Fireship)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/vAoB4VbhRzM?si=Tm72eRF_RPg1zXoW"},
          {id:"be-spring-l3-w28-extra", title:"موارد إضافية لهذا الأسبوع: Firebase Cloud Storage Documentation، Firebase Authentication Documentation، Firebase Cloud Firestore Documentation، Firebase Real-Time Database Documentation، Spring Boot Firebase Notifications with FCM (Ulter)، Spring Boot CRUD operations (TheCodeStorm)، Ultimate Guide to Firebase Storage Integration (IOCODES)، Connect Spring Boot REST API with Firebase (Techno Town Techie)", duration:"", type:"قراءة", videoUrl:"https://firebase.google.com/docs/storage"},
          {id:"be-spring-l3-w28-task", title:"مهمة الأسبوع: 1- Modify the file uploading service you created before or create a new one that uses Firebase Storage instead of local storage. 2- Create a Firebase Cloud Messaging (FCM) service that sends push notifications tozz users. 3- Use Firebase Firebase or Firebase RTDB as a database in a simple CRUD application.", duration:"", type:"تدريب", videoUrl:"https://firebase.google.com/docs/cloud-messaging"}
        ]},
        { id:"be-spring-l3-w29", title:"Level 3: Advanced - الأسبوع 29: Task Scheduling", duration:"أسبوع", lessons:[
          {id:"be-spring-l3-w29-r1", title:"Spring Task Scheduling Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/integration/scheduling.html"},
          {id:"be-spring-l3-w29-r2", title:"Automate Like a PRO: How to Use Scheduled in Spring Boot (Devtiro)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/YhZP6tSDXig?si=roMJLuRFarc_xjsA"},
          {id:"be-spring-l3-w29-extra", title:"موارد إضافية لهذا الأسبوع: Spring Scheduling Tasks Documentation، Spring Boot Quartz Scheduler Documentation، Spring Boot Scheduler (Techno Town Techie)، The @Scheduled Annotation in Spring (Baeldung)", duration:"", type:"قراءة", videoUrl:"https://spring.io/guides/gs/scheduling-tasks"},
          {id:"be-spring-l3-w29-task", title:"مهمة الأسبوع: 1- Implement a basic scheduled task that runs every 10 seconds using @Scheduled. 2- Modify the task to use a cron expression to execute at a specific time of day. 3- Create a dynamic scheduling system, where tasks can be enabled/disabled based on application settings. 4- Implement an asynchronous scheduled task using @Async.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-framework/reference/integration/scheduling.html"}
        ]},
        { id:"be-spring-l3-w30", title:"Level 3: Advanced - الأسبوع 30: More SQL Database, Spring JDBC, More Spring R2DBC.", duration:"أسبوع", lessons:[
          {id:"be-spring-l3-w30-r1", title:"Spring Data JDBC Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-data/relational/reference/"},
          {id:"be-spring-l3-w30-r2", title:"Java Database Connectivity | JDBC (Telusko)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/7v2OnUti2eM?si=driNdMEJmHHfNvLW"},
          {id:"be-spring-l3-w30-extra", title:"موارد إضافية لهذا الأسبوع: Spring JDBC Documentation، Spring Data Access with R2DBC Documentation، Spring Boot SQL Databases Documentation، Spring Boot JDBC using JdbcTemplate (Telusko)، JDBC Client and Spring Data JDBC (Dan Vega)، Spring Data JDBC Tutorial (Dan Vega)، Database Migrations with Flyway in Spring Boot (Devtiro)، Database Transactions in Spring Boot (Devtiro)", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-framework/reference/data-access/jdbc.html"},
          {id:"be-spring-l3-w30-task", title:"مهمة الأسبوع: 1- Implement CRUD Operations using Spring JDBC (JdbcTemplate). 2- Create one or two database migrations to an old database using Flyway. 3- Solve More SQL questions on Leetcode and HackerRank.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-data/relational/reference/"}
        ]},
        { id:"be-spring-l3-w31", title:"Level 3: Advanced - الأسبوع 31: More NoSQL Database and Spring Data MongoDB.", duration:"أسبوع", lessons:[
          {id:"be-spring-l3-w31-r1", title:"Getting Started with Spring Data MongoDB Documentation", duration:"", type:"قراءة", videoUrl:"https://spring.io/guides/gs/accessing-data-mongodb"},
          {id:"be-spring-l3-w31-r2", title:"MongoDB in 1 Hour (Bro Code)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/c2M-rlkkT5o?si=9taMSnuBpjnLA54H"},
          {id:"be-spring-l3-w31-extra", title:"موارد إضافية لهذا الأسبوع: Getting started with MongoDB and Spring Boot Documentation، Spring Data JPA Documentation، MongoDB Documentation، MongoDB in 30 Minutes (Web Deve Simplified)، MongoDB in Spring Boot Low-Level Tutorial (Telusko)، MongoDB in Spring Boot Tutorial (Amigoscode) (26:23~)، MongoDB in Spring Boot Tutorial (Programming Techie) (~15:00)، Switch to NoSQL, move FASTER (Devtiro)", duration:"", type:"قراءة", videoUrl:"https://www.mongodb.com/en-us/resources/products/compatibilities/spring-boot"},
          {id:"be-spring-l3-w31-task", title:"مهمة الأسبوع: 1- Create a MongoDB-backed Spring Boot application using Spring Data MongoDB. 2- Implement advanced CRUD operations with support for: * Custom queries using @Query * Pagination and Sorting * Transactions * Indexes 2- Use the Aggregation Framework to build advanced reporting queries (e.g. total sales per day, top products, etc.) 3- Add indexes for optimal query performance (e.g. on email, creation date).", duration:"", type:"تدريب", videoUrl:"https://spring.io/guides/gs/accessing-data-mongodb"}
        ]},
        { id:"be-spring-l3-w32", title:"Level 3: Advanced - الأسبوع 32: Docker and Deployment.", duration:"أسبوع", lessons:[
          {id:"be-spring-l3-w32-r1", title:"Docker Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.docker.com/"},
          {id:"be-spring-l3-w32-r2", title:"Docker in 100 Seconds (Fireship)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/Gjnup-PuquQ?si=ksebJNQlew7dHRJA"},
          {id:"be-spring-l3-w32-extra", title:"موارد إضافية لهذا الأسبوع: Docker Containers 101 (NetworkChuck)، 18 Weird and Wonderful ways I use Docker (NetworkChuck)، Docker and Kubernetes (Big Data)، Intro to Docker (Typcraft)، Docker Tutorial for Beginners (Fireship)، Docker Tutorial for Beginners (Mosh)، Docker Containers and Kubernetes Fundamentals (FreeCodeCamp.org)", duration:"", type:"قراءة", videoUrl:"https://youtu.be/eGz9DS-aIeY?si=SIPbzhvcsZlWy3rR"},
          {id:"be-spring-l3-w32-task", title:"مهمة الأسبوع: 1- Install Docker and Docker Compose on your system. 2- Pull and run basic images like `ubuntu`, `postgresql`, and `mysql`. 3- Create your own Dockerfile for a small web server. 4- Use Docker Compose to spin up a multi-container app. 5- Explore common `docker` CLI commands: `ps`, `images`, `logs`, `exec`, etc. 6- Write a document containing what you have learned about docker.", duration:"", type:"تدريب", videoUrl:"https://docs.docker.com/"}
        ]},
        { id:"be-spring-l3-w33", title:"Level 3: Advanced - الأسبوع 33: Microservices Architecture, API Gateway, Discovery Server, and Config Server", duration:"أسبوع", lessons:[
          {id:"be-spring-l3-w33-r1", title:"Spring Microservices Documentation", duration:"", type:"قراءة", videoUrl:"https://spring.io/microservices"},
          {id:"be-spring-l3-w33-r2", title:"Microservices Architecture Tutorial (Java Brains)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/hmkF77F9TLw?si=sq4k3I99PkVfKn3z"},
          {id:"be-spring-l3-w33-extra", title:"موارد إضافية لهذا الأسبوع: Spring Cloud Documentation، Spring Cloud Gateway Documentation، Spring Cloud Netflix Eureka Documentation، Spring Cloud Config Documentation، Spring Boot Microservices - Full Course (Amigoscode)، Spring Boot Microservices with Spring Cloud (Telusko)، Spring Cloud Gateway Tutorial (Code Decode)، Spring Cloud Config Server Tutorial (Code Decode)", duration:"", type:"قراءة", videoUrl:"https://spring.io/projects/spring-cloud"},
          {id:"be-spring-l3-w33-task", title:"مهمة الأسبوع: 1- Build a very simple microservices project with only an API Gateway, a Discovery Server, and two microservices. 2- Take an old project and migrate it to the microservices architecture.", duration:"", type:"تدريب", videoUrl:"https://spring.io/microservices"}
        ]},
        { id:"be-spring-l3-w34", title:"Level 3: Advanced - الأسبوع 34: Message Queues, Kafka, RabbitMQ, and ActiveMQ", duration:"أسبوع", lessons:[
          {id:"be-spring-l3-w34-r1", title:"Spring for Apache Kafka Documentation", duration:"", type:"قراءة", videoUrl:"https://docs.spring.io/spring-kafka/reference/index.html"},
          {id:"be-spring-l3-w34-r2", title:"Message Queues Explained (IBM Technology)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/xErwDaOc-Gs"},
          {id:"be-spring-l3-w34-extra", title:"موارد إضافية لهذا الأسبوع: Spring for RabbitMQ Documentation، Spring AMQP Documentation، Spring JMS Documentation، Kafka in 100 Seconds (Fireship)، RabbitMQ in 100 Seconds (Fireship)، Publish-Subscribe Architecture (Hussein Nasser)، Apache Kafka Crash Course (Hussein Nasser)، RabbitMQ Crash Course (Hussein Nasser)", duration:"", type:"قراءة", videoUrl:"https://spring.io/guides/gs/messaging-rabbitmq"},
          {id:"be-spring-l3-w34-task", title:"مهمة الأسبوع: 1- Set up a local Kafka broker and create a simple producer-consumer application in Spring Boot. 2- Implement a RabbitMQ message queue: * Create a producer service that sends messages to a queue. * Create a consumer service that processes messages from the queue. * Test the communication between microservices using RabbitMQ. 3- Build an Event-Driven Microservices System: * Create two microservices (Order Service and Notification Service). * When an order is placed in the Order Service, publish an event to Kafka/RabbitMQ. * The Notification Service should consume the event and send a notification ( email or log ). 4- Write a document explaining the differences between Kafka and RabbitMQ.", duration:"", type:"تدريب", videoUrl:"https://docs.spring.io/spring-kafka/reference/index.html"}
        ]},
        { id:"be-spring-l3-w35", title:"Level 3: Advanced - الأسبوع 35: Building a Microservices-Based E-Commerce Platform", duration:"أسبوع", lessons:[
          {id:"be-spring-l3-w35-project", title:"مشروع الأسبوع: Migrate the E-Commerce backend from Week 19 into a microservices architecture using Kafka/RabbitMQ, API Gateway, Eureka, Redis, Docker, and Spring Cloud Config.", duration:"", type:"مشروع", videoUrl:"https://roadmap.sh/backend"}
        ]},
        ]
      }
    ]
  },

  { id:"mobile", name:"تطوير تطبيقات موبايل", cat:"تقني", icon:"📱", desc:"بناء تطبيقات iOS و Android تُستخدم يومياً بالملايين.",
    longDesc:"مطور تطبيقات الموبايل بيبني التطبيقات اللي بتفتحها على iOS وAndroid كل يوم. ممكن يتخصص في React Native أو Flutter لبناء تطبيق واحد يشتغل على الاتنين، أو يتعلم Swift لـ Apple أو Kotlin لـ Android. سوق التطبيقات ضخم ونمو طلبه مستمر.", difficulty:"صعب", time:"6-12 شهر", match:80, salary:"1500-6000$",
    tools:["React Native","Flutter","Swift","Kotlin","Firebase"],
    daily:["تطوير features جديدة","اختبار على أجهزة حقيقية","تحسين الأداء","نشر تحديثات","التعاون مع الفريق"],
    roadmap:[{t:"اختر المسار",d:"React Native (للاثنين) أو Native"},{t:"JavaScript/Dart",d:"اللغة الأساسية"},{t:"بناء تطبيق",d:"To-Do أو Weather App كأول مشروع"},{t:"APIs & Backend",d:"ربط التطبيق بالخادم"},{t:"نشر",d:"App Store & Google Play"}],
    course:"https://reactnative.dev/docs/getting-started", example:"مطور تطبيقات يبدأ بـ 1500-3000$ شهرياً." ,disabled: true},
  { id:"data", name:"علم البيانات", cat:"تقني", icon:"📊", desc:"استخراج رؤى قيّمة من البيانات الضخمة لاتخاذ قرارات ذكية.",
    longDesc:"عالم البيانات بيحلل ملايين الصفوف من البيانات ليستخرج منها أنماط وتوقعات تساعد الشركات في اتخاذ قرارات أذكى. بيستخدم Python وPandas وSQL وTensorFlow. من أكثر التخصصات طلباً في المستقبل مع توسع الاقتصاد الرقمي وحجم البيانات المتولدة.", difficulty:"صعب", time:"8-14 شهر", match:76, salary:"2000-8000$",
    tools:["Python","Pandas","NumPy","Matplotlib","SQL","Jupyter"],
    daily:["تحليل بيانات العملاء","بناء نماذج تنبؤية","إعداد تقارير بيانية","تنظيف البيانات","تواصل مع فرق المنتج"],
    roadmap:[{t:"Python أساسيات",d:"اللغة الأساسية لعلم البيانات"},{t:"SQL",d:"استخراج البيانات من قواعد البيانات"},{t:"Pandas & NumPy",d:"معالجة وتحليل البيانات"},{t:"Data Visualization",d:"Matplotlib, Seaborn, Tableau"},{t:"Machine Learning",d:"Scikit-learn أساسيات"}],
    course:"https://www.kaggle.com/learn", example:"محلل بيانات يبدأ بـ 2000-4000$ شهرياً." ,disabled: true },

  { id:"ai", name:"الذكاء الاصطناعي والـ AI", cat:"تقني", icon:"🤖", desc:"بناء أنظمة ذكية تتعلم وتتخذ قرارات — مستقبل التقنية.",
    longDesc:"متخصص الذكاء الاصطناعي بيبني النماذج والأنظمة اللي تقدر تتعلم وتفكر وتتخذ قرارات — من التعرف على الصور للمساعدين الصوتيين لنماذج اللغة الكبيرة. يحتاج خلفية في الرياضيات والإحصاء وPython. الرواتب فيه من الأعلى عالمياً والطلب في ارتفاع مستمر.", difficulty:"صعب", time:"12-18 شهر", match:78, salary:"3000-10000$",
    tools:["Python","TensorFlow","PyTorch","Hugging Face","LangChain"],
    daily:["تدريب نماذج AI","ضبط وتحسين النماذج","بحث أوراق علمية","integration مع تطبيقات","رفع النماذج للخدمة"],
    roadmap:[{t:"رياضيات للـ AI",d:"إحصاء، جبر خطي، حساب"},{t:"Python المتقدم",d:"OOP و Libraries"},{t:"Machine Learning",d:"الخوارزميات الأساسية"},{t:"Deep Learning",d:"Neural Networks"},{t:"مشاريع حقيقية",d:"Kaggle Competitions"}],
    course:"https://www.fast.ai/", example:"مهندس AI يبدأ بـ 3000-6000$ شهرياً." ,disabled: true },

  { id:"cybersecurity", name:"أمن المعلومات", cat:"تقني", icon:"🔐", desc:"حماية الأنظمة والبيانات من الهجمات الإلكترونية.",
    longDesc:"متخصص أمن المعلومات بيحمي الأنظمة والبيانات من الاختراقات والهجمات. بيفكر زي الهاكر عشان يلاقي الثغرات قبل الأشرار (Ethical Hacking). بيستخدم أدوات زي Kali Linux وWireshark. مع تزايد الهجمات الإلكترونية يومياً، الطلب على المتخصصين دول ضخم جداً.", difficulty:"صعب", time:"8-14 شهر", match:72, salary:"2000-8000$",
    tools:["Kali Linux","Wireshark","Metasploit","Burp Suite","Nmap"],
    daily:["اختبار اختراق الأنظمة","تحليل الثغرات الأمنية","كتابة تقارير أمنية","متابعة CVEs جديدة","تطوير سياسات أمنية"],
    roadmap:[{t:"شبكات وبروتوكولات",d:"TCP/IP, DNS, HTTP أساسيات"},{t:"Linux",d:"سطر الأوامر والنظام"},{t:"Security+",d:"شهادة مبتدئ معتمدة"},{t:"Ethical Hacking",d:"CEH أو OSCP"},{t:"تخصص",d:"Penetration Testing, SOC, GRC"}],
    course:"https://tryhackme.com/", example:"محلل أمني مبتدئ يبدأ بـ 2000-4000$ شهرياً.",
    tracks:[{
      id:"cybersecurity-track", title:"CAT Reloaded Cyber Security Road Map", subtitle:"اختر تخصصك: Pentesting, RE/Malware, Network Security, SOC/DFIR, Cryptography",
      longDesc:"خارطة طريق الأمن السيبراني دي مش مسار خطي واحد — دي مجموعة تخصصات فرعية (Sub-Circles) تختار منها حسب شغفك بعد ما تاخد فكرة عن كل واحد فيهم: Penetration Testing (هجومي: Web وNetwork)، Reverse Engineering & Malware Analysis، Network Security (دفاعي)، SOC Analyst & DFIR، وCryptography. كل تخصص ليه خارطة طريق Notion مفصّلة بتتحدّث باستمرار + ملف PDF شامل (Google Drive) من نفس الفريق. اتاخد وقتك في الاختيار، ابدأ بالـ Entry Level الأساسي الأول.",
      level:"مبتدئ → متقدم", duration:"يعتمد على التخصص المختار", totalLessons:14, icon:"🔐", color:"#1f6feb", coverImage:"assets/pngtree-a-hand-writing-code-on-digital-interface-with-glowing-connections-symbolizing-image_17075797.jpg",
      intro:{
        tools:[
          {name:"Kali Linux", purpose:"توزيعة Linux مخصّصة لأدوات الأمن السيبراني", url:"https://www.kali.org/get-kali/"},
          {name:"Wireshark", purpose:"تحليل حزم الشبكة", url:"https://www.wireshark.org/download.html"},
          {name:"VirtualBox / VMware", purpose:"تشغيل بيئات اختبار افتراضية وآمنة", url:"https://www.virtualbox.org/"},
          {name:"Burp Suite", purpose:"اختبار اختراق تطبيقات الويب", url:"https://portswigger.net/burp/communitydownload"}
        ],
        accounts:[
          {name:"TryHackMe", why:"تدريب عملي تفاعلي على السيناريوهات الحقيقية", url:"https://tryhackme.com/"},
          {name:"Hack The Box", why:"معامل اختراق احترافية للتدريب المتقدم", url:"https://www.hackthebox.com/"},
          {name:"GitHub", why:"حفظ أدواتك وسكريبتاتك", url:"https://github.com/"}
        ],
        plan:[
          {title:"المهارات الأساسية (Entry Level)", duration:"يحدَّد ذاتياً", goal:"شبكات، Linux، برمجة، أساسيات Cryptography — قبل التخصص"},
          {title:"اختر تخصصك", duration:"—", goal:"Penetration Testing / RE & Malware / Network Security / SOC & DFIR / Cryptography"},
          {title:"التعمّق والتطبيق", duration:"—", goal:"اتبع خارطة الطريق التفصيلية لتخصصك حتى الاحتراف"}
        ],
        challenge:[
          {name:"TryHackMe", url:"https://tryhackme.com/"},
          {name:"Hack The Box", url:"https://www.hackthebox.com/"},
          {name:"PicoCTF", url:"https://picoctf.org/"}
        ]
      },
      courses:[
        { id:"cyber-intro", title:"مقدمة: ما هو الأمن السيبراني؟ وأسئلة شائعة", duration:"—", lessons:[
          {id:"cyber-intro-01", title:"So you wanna do security؟ (فيديو تعريفي بمجالات الأمن السيبراني)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/i8rizLc4hc0"},
          {id:"cyber-intro-02", title:"يوم في حياة محترف أمن سيبراني (فيديو ضمن بلايليست تخصصات الأمن السيبراني)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/embed/ompZWkWsn9A"}
        ]},
        { id:"cyber-essentials", title:"المهارات الأساسية قبل الأمن السيبراني (Entry Level)", duration:"—", lessons:[
          {id:"cyber-essentials-01", title:"خارطة الطريق: المهارات الأساسية قبل الأمن السيبراني (Entry Level Roadmap)", duration:"", type:"قراءة", videoUrl:"https://www.notion.so/eljooker/Entry-Level-Roadmap-12f3f791038f807b9b84cf7d875a6e5d"}
        ]},
        { id:"cyber-pt-web", title:"Penetration Testing — Web App (WAPTR, Level 1)", duration:"—", lessons:[
          {id:"cyber-pt-web-01", title:"خارطة طريق Web App Penetration Testing (محدّثة، مبسّطة بجدول دراسة)", duration:"", type:"قراءة", videoUrl:"https://third-open-099.notion.site/Penetration-testing-13bb1f518de7804f9220c035f65bdb87?pvs=4"},
          {id:"cyber-pt-web-02", title:"خارطة الطريق الرئيسية لاختبار اختراق تطبيقات الويب — Muhammad Gamal (دليل شامل)", duration:"", type:"قراءة", videoUrl:"https://drive.google.com/file/d/1YlYBgkith2ycK8aqP2bv_a-S9YD6LANi/view?usp=sharing"}
        ]},
        { id:"cyber-pt-network", title:"Penetration Testing — Network (NPTR, Level 2)", duration:"—", lessons:[
          {id:"cyber-pt-net-01", title:"خارطة طريق Network Penetration Testing (محدّثة، خطوة بخطوة)", duration:"", type:"قراءة", videoUrl:"https://third-open-099.notion.site/Roadmap-for-Network-Pentest-Level-2-12eb1f518de78021b90ef331f8d9d2e4?pvs=4"},
          {id:"cyber-pt-net-02", title:"خارطة الطريق الرئيسية لاختبار اختراق الشبكات (دليل متعمّق)", duration:"", type:"قراءة", videoUrl:"https://drive.google.com/file/d/1OGCm2PHs0qX1NqmkeZFv9q-lo10fPbht/view?usp=sharing"}
        ]},
        { id:"cyber-pt-mobile", title:"Penetration Testing — Mobile/Android (Level 3, قريباً)", duration:"—", lessons:[
          {id:"cyber-pt-mobile-note", title:"🚧 مسار Android Penetration Testing (Level 3) — تحت الإنشاء حالياً، سيُضاف قريباً بأدوات ومعامل تدريب مخصّصة للأمن السيبراني للموبايل", duration:"", type:"قراءة", videoUrl:"https://third-open-099.notion.site/Penetration-testing-13bb1f518de7804f9220c035f65bdb87?pvs=4"}
        ]},
        { id:"cyber-rema", title:"Reverse Engineering & Malware Analysis (Level 1 & 2)", duration:"—", lessons:[
          {id:"cyber-rema-01", title:"خارطة الطريق الجديدة: Reverse Engineering & Malware Analysis (يتم تحديثها باستمرار)", duration:"", type:"قراءة", videoUrl:"https://www.notion.so/eljooker/RE-MA-Road-Map-13b3f791038f8063a2bfee5884ee1543?pvs=25"},
          {id:"cyber-rema-02", title:"خارطة الطريق الرئيسية لتحليل البرمجيات الخبيثة والـ Reverse Engineering", duration:"", type:"قراءة", videoUrl:"https://drive.google.com/file/d/13nDt8I-LoUq350HgeVq0UVhoF9qyhQVh/view?usp=sharing"}
        ]},
        { id:"cyber-netsec", title:"Network Security (Defensive)", duration:"—", lessons:[
          {id:"cyber-netsec-01", title:"خارطة طريق Network Security (الدفاعي)", duration:"", type:"قراءة", videoUrl:"https://grove-tuck-ba3.notion.site/Network-security-138e4937b36e80b28e2ac0b8d8731b86?pvs=4"}
        ]},
        { id:"cyber-soc-dfir", title:"SOC Analyst & DFIR", duration:"—", lessons:[
          {id:"cyber-soc-01", title:"خارطة الطريق الجديدة: SOC & DFIR (دروس ومسار كامل)", duration:"", type:"قراءة", videoUrl:"https://www.notion.so/SOC-DFIR-RoadMap-Courses-Path-13d75215856d80609ed2f5453ea43272?pvs=4"},
          {id:"cyber-soc-02", title:"خارطة الطريق الرئيسية لـ SOC Analyst & DFIR", duration:"", type:"قراءة", videoUrl:"https://drive.google.com/file/d/14kQBiI_U17_rzwXpJpSEYnWtblfVYwn1/view?usp=sharing"}
        ]},
        { id:"cyber-cryptography", title:"Cryptography", duration:"—", lessons:[
          {id:"cyber-crypto-01", title:"خارطة طريق Cryptography (جديد 🌟)", duration:"", type:"قراءة", videoUrl:"https://butter-tortellini-830.notion.site/CAT-Reloaded-Cryptography-roadmap-14ab155a2c68804bbbf0ca53260e92f1"}
        ]},
      ]
    }]
  },

  { id:"devops", name:"DevOps & Cloud", cat:"تقني", icon:"☁️", desc:"أتمتة العمليات وإدارة البنية التحتية السحابية.",
    longDesc:"مهندس DevOps بيضمن إن الكود اللي بيكتبه المطورين يوصل للمستخدمين بسرعة وأمان. بيشتغل على أتمتة عمليات النشر والاختبار، وإدارة منصات سحابية زي AWS وGoogle Cloud. الجسر الضروري بين الـ Development والـ Operations في أي شركة تقنية.", difficulty:"صعب", time:"8-14 شهر", match:70, salary:"2500-10000$",
    tools:["Docker","Kubernetes","AWS","GitHub Actions","Terraform"],
    daily:["إعداد pipelines CI/CD","إدارة خوادم السحاب","مراقبة الأنظمة","أتمتة العمليات اليدوية"],
    roadmap:[{t:"Linux & Bash",d:"أساسيات سطر الأوامر"},{t:"Docker",d:"containers وفهم البيئات"},{t:"CI/CD",d:"GitHub Actions أو GitLab CI"},{t:"Kubernetes",d:"orchestration للcontainers"},{t:"AWS/GCP",d:"شهادة Cloud Practitioner"}],
    course:"https://www.freecodecamp.org/news/devops-with-docker-c66b6a6c9424/", example:"مهندس DevOps يكسب 3000-8000$ شهرياً."  ,disabled: true},

  { id:"gamedev", name:"تطوير ألعاب", cat:"تقني", icon:"🎮", desc:"صناعة ألعاب فيديو تُلهب حماس الملايين حول العالم.",
    longDesc:"مطور الألعاب بيبني عوالم تفاعلية ترفيهية من الصفر. بيستخدم محركات زي Unity (للألعاب الموبايل والـ PC) أو Unreal Engine (للألعاب الضخمة). بيجمع مهارات البرمجة مع الإبداع والفهم العميق لتجربة المستخدم. صناعة الألعاب أكبر من صناعة الأفلام والموسيقى مجتمعين.", difficulty:"صعب", time:"8-16 شهر", match:73, salary:"1000-6000$",
    tools:["Unity","Unreal Engine","C#","C++","Blender"],
    daily:["برمجة game mechanics","تصميم levels","اختبار وتصحيح الأخطاء","التعاون مع مصممين وفنانين"],
    roadmap:[{t:"Unity أساسيات",d:"أشهر محرك ألعاب"},{t:"C# البرمجة",d:"اللغة الأساسية لـ Unity"},{t:"أول لعبة",d:"2D Platformer بسيط"},{t:"Game Design",d:"مستويات وميكانيكا ممتعة"},{t:"نشر",d:"Steam, App Store, Itch.io"}],
    course:"https://learn.unity.com/", example:"مطور ألعاب مستقل يكسب 1000-4000$ شهرياً.",
    tracks:[{
      id:"gamedev-track", title:"مسار تطوير الألعاب", subtitle:"من أساسيات C# إلى بناء ألعاب 2D و3D كاملة",
      longDesc:"تطوير الألعاب مسار يجمع تقنيات متعددة (برمجة، رياضيات، تصميم، فن، صوت). أفضل بداية هي تعلّم C# مع محرك Unity للوصول لفهم جيد لصناعة الألعاب، وبعدها تقدر تتعمّق في الجرافيك أو تتبع شغفك حيث ما يقودك. لو تفضّل C++ وتحب تبدأ بـ Unreal Engine مباشرة، أو لو الموديلينج بـ Blender هو اهتمامك الأساسي، المسار ده يوفّر لك كل المصادر اللي تحتاجها. الخطة الأساسية: 5 مراحل على مدار 14 أسبوع (C# → Game Design → Game Art → Advanced Game Design → 3D Game Art بـ Blender)، بالإضافة لمكتبة ضخمة من الموارد الإضافية (Unity, Unreal, برمجة الجرافيكس, الموسيقى, الأصول الجاهزة).",
      level:"مبتدئ → متوسط", duration:"14 أسبوع (~3-4 أشهر) + موارد تعميق", totalLessons:122, icon:"🎮", color:"#9b5de5", coverImage:"assets/pngtree-a-hand-writing-code-on-digital-interface-with-glowing-connections-symbolizing-image_17075797.jpg",
      intro:{
        tools:[
          {name:"Unity", purpose:"محرك الألعاب الأساسي للمسار", url:"https://store.unity.com/download"},
          {name:"Visual Studio / VS Code", purpose:"كتابة كود C#", url:"https://visualstudio.microsoft.com/"},
          {name:"Blender", purpose:"النمذجة والحركة ثلاثية الأبعاد", url:"https://www.blender.org/download/"},
          {name:"Aseprite", purpose:"رسم Pixel Art والحركة 2D", url:"https://www.aseprite.org/"}
        ],
        accounts:[
          {name:"GitHub", why:"حفظ مشاريعك ومتابعة تقدّمك", url:"https://github.com/"},
          {name:"itch.io", why:"نشر ألعابك والمشاركة في Game Jams", url:"https://itch.io/"},
          {name:"Unity ID", why:"التفعيل واستخدام Unity Learn", url:"https://id.unity.com/"}
        ],
        plan:[
          {title:"Phase 1: C#", duration:"أسبوعان", goal:"أساسيات اللغة والبرمجة الكائنية OOP"},
          {title:"Phase 2: Game Design", duration:"أسبوعان", goal:"أول ألعابك: مكعب لانهائي وFlappy Bird"},
          {title:"Phase 3: Game Art", duration:"3 أسابيع", goal:"نظرية الألوان، فن البكسل، والحركة Animation"},
          {title:"Phase 4: Advance Game Design", duration:"4 أسابيع", goal:"Platformer، FPS بذكاء عدو، Tower Defense"},
          {title:"Phase 5: 3D Game Art (Blender)", duration:"3 أسابيع", goal:"نمذجة وحركة ومحاكاة ثلاثية الأبعاد"}
        ],
        challenge:[
          {name:"itch.io Game Jams", url:"https://itch.io/jams"},
          {name:"Unity Asset Store", url:"https://assetstore.unity.com/"},
          {name:"Sketchfab", url:"https://sketchfab.com"}
        ]
      },
      courses:[
        { id:"gd-phase1-csharp", title:"Phase 1: C# (الأسبوع 1-2)", duration:"أسبوعان", lessons:[
          {id:"gd-cs-w1-01", title:"أساسيات C# (فيديو تأسيسي)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/gfkTfcpWqAY"},
          {id:"gd-cs-w1-02", title:"أساسيات C# (بلايليست كاملة)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/pSiIHe2uZ2w"},
          {id:"gd-cs-w1-task", title:"مهمة الأسبوع 1: حل تمارين C# Problems", duration:"", type:"مشروع", videoUrl:"https://drive.google.com/file/d/1vq_-dLM8OHch2ze-ALMiYHCZ7tdqICHc/view?usp=sharing"},
          {id:"gd-cs-w2-01", title:"مقدمة البرمجة الكائنية OOP (ابدأ من 1:4)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/fK2lLVqc8UY"},
          {id:"gd-cs-w2-02", title:"بلايليست OOP كاملة", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLnzqK5HvcpwQfXeFaGHRYQfyQrJjOy43u"},
          {id:"gd-cs-w2-task", title:"مهمة الأسبوع 2: بناء نظام OOP System", duration:"", type:"مشروع", videoUrl:"https://drive.google.com/file/d/1oJ-Ya5HF26yYf1ktg_2a3HrzZa-X1GO6/view?usp=sharing"}
        ]},
        { id:"gd-phase2-gamedesign", title:"Phase 2: Game Design (الأسبوع 3-4)", duration:"أسبوعان", lessons:[
          {id:"gd-design-w3-01", title:"بلايليست Game Design", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLPV2KyIb3jR53Jce9hP7G5xC4O9AgnOuL"},
          {id:"gd-design-w3-task", title:"مهمة الأسبوع 3: بناء مكعب لانهائي 3D Endless Cube", duration:"", type:"مشروع", videoUrl:"https://youtube.com/playlist?list=PLPV2KyIb3jR53Jce9hP7G5xC4O9AgnOuL"},
          {id:"gd-design-w4-01", title:"بلايليست تطوير لعبة Flappy Bird", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLX2vGYjWbI0QBJUI5wI3lBTaz85k37dwo"},
          {id:"gd-design-w4-02", title:"فيديو تكميلي لتطوير القائمة Menu", duration:"", type:"فيديو", videoUrl:"https://youtu.be/ihvBiJ1oC9U"},
          {id:"gd-design-w4-task", title:"مهمة الأسبوع 4: بناء لعبة Flappy Bird بقائمة كاملة", duration:"", type:"مشروع", videoUrl:"https://youtube.com/playlist?list=PLX2vGYjWbI0QBJUI5wI3lBTaz85k37dwo"}
        ]},
        { id:"gd-phase3-gameart", title:"Phase 3: Game Art (الأسبوع 5-7)", duration:"3 أسابيع", lessons:[
          {id:"gd-art-w5-01", title:"مقدمة فن الألعاب: نظرية الألوان Color Theory", duration:"", type:"فيديو", videoUrl:"https://youtu.be/NBg3GjrcMF4"},
          {id:"gd-art-w5-02", title:"نظرية الألوان: فيديو إضافي 1", duration:"", type:"فيديو", videoUrl:"https://youtu.be/BMIa1LyWPAo"},
          {id:"gd-art-w5-03", title:"نظرية الألوان: فيديو إضافي 2", duration:"", type:"فيديو", videoUrl:"https://youtu.be/YeI6Wqn4I78"},
          {id:"gd-art-w5-04", title:"بلايليست مبادئ الحركة Animation Principles", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL-bOh8btec4CXd2ya1NmSKpi92U_l6ZJd"},
          {id:"gd-art-w5-task", title:"مهمة الأسبوع 5: تلخيص أهم ما تعلّمته من المصادر", duration:"", type:"تدريب", videoUrl:"https://youtu.be/NBg3GjrcMF4"},
          {id:"gd-art-w6-01", title:"كيف تبدأ في فن البكسل Pixel Art", duration:"", type:"فيديو", videoUrl:"https://youtu.be/WUlgvNe4BLU"},
          {id:"gd-art-w6-02", title:"إنشاء Tileset", duration:"", type:"فيديو", videoUrl:"https://youtu.be/btnH0x7_1g8"},
          {id:"gd-art-w6-03", title:"خلفية بكسل Pixel Background", duration:"", type:"فيديو", videoUrl:"https://youtu.be/OsRqXyE3rOI"},
          {id:"gd-art-w6-04", title:"خلفية متوازية Parallax Background", duration:"", type:"فيديو", videoUrl:"https://youtu.be/7_qw0tWR3yk"},
          {id:"gd-art-w6-05", title:"تصميم شخصية في Photoshop", duration:"", type:"فيديو", videoUrl:"https://youtu.be/rLdA4Amea7Y"},
          {id:"gd-art-w6-06", title:"تصميم شخصية في Aseprite", duration:"", type:"فيديو", videoUrl:"https://youtu.be/UPAHMyN9YeQ"},
          {id:"gd-art-w6-07", title:"تصميم شخصية بكسل Pixel Character Design", duration:"", type:"فيديو", videoUrl:"https://youtu.be/vXm5VjZA4Ys"},
          {id:"gd-art-w6-08", title:"بلايليست كاملة لفن البكسل والـ 2D", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLR3Ra9cf8aV06i2jKmgKvcYVHI86-4K_b"},
          {id:"gd-art-w6-task", title:"مهمة الأسبوع 6: إنشاء Tileset وخلفية مستوى وعقبات وشخصية لعبة", duration:"", type:"مشروع", videoUrl:"https://youtu.be/WUlgvNe4BLU"},
          {id:"gd-art-w7-01", title:"مقدمة Aseprite", duration:"", type:"فيديو", videoUrl:"https://youtu.be/N4Z4MdZ1KWY"},
          {id:"gd-art-w7-02", title:"حركة الثبات Idle Animation (1)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/zqOv4wyKOQw"},
          {id:"gd-art-w7-03", title:"حركة الثبات Idle Animation (2)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/vs-ierVdE7I"},
          {id:"gd-art-w7-04", title:"مقدمة الحركة في Photoshop", duration:"", type:"فيديو", videoUrl:"https://youtu.be/jdnCOlATb-c"},
          {id:"gd-art-w7-05", title:"حركة المشي Walk Cycle في Photoshop", duration:"", type:"فيديو", videoUrl:"https://youtu.be/7T6yOk5n-zk"},
          {id:"gd-art-w7-task", title:"مهمة الأسبوع 7: إنشاء 4 حركات للشخصية (ثبات، جري، نطّ، موت)", duration:"", type:"مشروع", videoUrl:"https://youtu.be/N4Z4MdZ1KWY"}
        ]},
        { id:"gd-phase4-advanced", title:"Phase 4: Advance Game Design (الأسبوع 8-11)", duration:"4 أسابيع", lessons:[
          {id:"gd-adv-w8-01", title:"بلايليست تطوير لعبة 2D Platformer", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLrnPJCHvNZuCVTz6lvhR81nnaf1a-b67U"},
          {id:"gd-adv-w8-task", title:"مهمة الأسبوع 8: بناء 2D Platformer بمستويين وقائمة وشاشتي بداية/نهاية", duration:"", type:"مشروع", videoUrl:"https://youtube.com/playlist?list=PLrnPJCHvNZuCVTz6lvhR81nnaf1a-b67U"},
          {id:"gd-adv-w9-01", title:"بلايليست FPS الأولى", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLPV2KyIb3jR7dFbE2UQYu7QWMdUgDnlnk"},
          {id:"gd-adv-w9-02", title:"بلايليست FPS الثانية", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLGUw8UNswJEOv8c5ZcoHarbON6mIEUFBC"},
          {id:"gd-adv-w9-03", title:"ذكاء العدو Enemy AI (الجزء 1، حلقات 1-4)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL0WgRP7BtOewNtJdJNE-YjlpcU-wl1lAi"},
          {id:"gd-adv-w9-04", title:"ذكاء العدو Enemy AI (الجزء 2، من 12:14)", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL0WgRP7BtOexM4HPofmi9ta9TlQr77J12"},
          {id:"gd-adv-w9-task", title:"مهمة الأسبوع 9: بناء لعبة FPS ثلاثية الأبعاد بذكاء عدو", duration:"", type:"مشروع", videoUrl:"https://youtube.com/playlist?list=PLPV2KyIb3jR7dFbE2UQYu7QWMdUgDnlnk"},
          {id:"gd-adv-w10-01", title:"فيديو تطوير Flappy Bird ثلاثي الأبعاد (1)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/BXc11tl2YtI"},
          {id:"gd-adv-w10-02", title:"فيديو تطوير Flappy Bird ثلاثي الأبعاد (2)", duration:"", type:"فيديو", videoUrl:"https://youtu.be/3pBuqncIg5k"},
          {id:"gd-adv-w10-task", title:"مهمة الأسبوع 10: إنشاء لعبة Flappy Bird ثلاثية الأبعاد", duration:"", type:"مشروع", videoUrl:"https://youtu.be/BXc11tl2YtI"},
          {id:"gd-adv-w11-01", title:"بلايليست لعبة Tower Defense", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PLPV2KyIb3jR4u5jX8za5iU1cqnQPmbzG0"},
          {id:"gd-adv-w11-task", title:"مهمة الأسبوع 11: بناء لعبة Tower Defense ثلاثية الأبعاد", duration:"", type:"مشروع", videoUrl:"https://youtube.com/playlist?list=PLPV2KyIb3jR4u5jX8za5iU1cqnQPmbzG0"}
        ]},
        { id:"gd-phase5-blender", title:"Phase 5: 3D Game Art - Blender (الأسبوع 12-14)", duration:"3 أسابيع", lessons:[
          {id:"gd-blender-w12-01", title:"بلايليست مقدمة Blender", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL3GeP3YLZn5hhfaGRSmRia0OwPPMfJu0V"},
          {id:"gd-blender-w12-task", title:"مهمة الأسبوع 12: إنشاء أصل ثابت (Static Asset) لأي لعبة", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/playlist?list=PL3GeP3YLZn5hhfaGRSmRia0OwPPMfJu0V"},
          {id:"gd-blender-w13-01", title:"بلايليست الحركة والمحاكاة في Blender", duration:"", type:"فيديو", videoUrl:"https://youtube.com/playlist?list=PL-BTVXXeho5SFUrYlj_nL8rHjOdmt_uLF"},
          {id:"gd-blender-w13-task", title:"مهمة الأسبوع 13: بناء موديل صاروخ وتحريكه بمحاكاة نار الإقلاع", duration:"", type:"مشروع", videoUrl:"https://youtube.com/playlist?list=PL-BTVXXeho5SFUrYlj_nL8rHjOdmt_uLF"},
          {id:"gd-blender-w14-01", title:"بلايليست النقش والتبسيط Sculpting & Retopology", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL-BTVXXeho5TXgzvHUpjjWT4VLLMVWvVP"},
          {id:"gd-blender-w14-task", title:"مهمة الأسبوع 14: إنشاء موديل شخصية باستخدام Sculpting و Retopology", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/playlist?list=PL-BTVXXeho5TXgzvHUpjjWT4VLLMVWvVP"}
        ]},
        { id:"gd-res-prog-languages", title:"موارد إضافية: لغات البرمجة (C# / C++)", duration:"—", lessons:[
          {id:"gd-lang-cs-01", title:"فيديوهات C# (مجموعة CAT)", duration:"", type:"قراءة", videoUrl:"http://bit.ly/CsharpCAT"},
          {id:"gd-lang-cs-02", title:"كورس Brackeys لتعلّم C#", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=pSiIHe2uZ2w&list=PLPV2KyIb3jR6ZkG8gZwJYSjnXxmfPAl51"},
          {id:"gd-lang-cs-03", title:"مقالات C# (مجموعة CAT)", duration:"", type:"قراءة", videoUrl:"http://bit.ly/CsharpTutorialsCAT"},
          {id:"gd-lang-cs-04", title:"C# للمبتدئين", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=gfkTfcpWqAY&list=PLTjRvDozrdlz3_FPXwb6lX_HoGXa09Yef"},
          {id:"gd-lang-cs-05", title:"Unity Learn: البرمجة للمبتدئين", duration:"", type:"فيديو", videoUrl:"https://learn.unity.com/course/beginner-scripting"},
          {id:"gd-lang-cs-06", title:"Unity Learn: البرمجة للمستوى المتوسط", duration:"", type:"فيديو", videoUrl:"https://learn.unity.com/project/intermediate-gameplay-scripting"},
          {id:"gd-lang-cpp-01", title:"Learn CPP — مرجع كامل لتعلّم C++", duration:"", type:"فيديو", videoUrl:"https://www.learncpp.com"},
          {id:"gd-lang-cpp-02", title:"Fluent CPP — مقالات يومية عن C++", duration:"", type:"فيديو", videoUrl:"https://www.fluentcpp.com/dailycpp/"}
        ]},
        { id:"gd-res-unity", title:"محرك Unity: كورسات ومشاريع وموارد", duration:"—", lessons:[
          {id:"gd-unity-01", title:"تحميل Unity", duration:"", type:"فيديو", videoUrl:"https://store.unity.com/download"},
          {id:"gd-unity-02", title:"Unity Essentials Pathway", duration:"", type:"فيديو", videoUrl:"https://learn.unity.com/pathway/unity-essentials"},
          {id:"gd-unity-03", title:"Unity Junior Programmer Pathway", duration:"", type:"فيديو", videoUrl:"https://learn.unity.com/pathway/junior-programmer"},
          {id:"gd-unity-04", title:"كورس C# Programming for Unity (Coursera)", duration:"", type:"فيديو", videoUrl:"https://www.coursera.org/specializations/programming-unity-game-development"},
          {id:"gd-unity-05", title:"هياكل البيانات وأنماط التصميم لمطوري الألعاب (Coursera)", duration:"", type:"فيديو", videoUrl:"https://www.coursera.org/learn/data-structures-design-patterns"},
          {id:"gd-unity-06", title:"كورس Complete C# Unity Developer 2D (Udemy)", duration:"", type:"فيديو", videoUrl:"https://www.udemy.com/course/unitycourse/"},
          {id:"gd-unity-07", title:"كورس Complete C# Unity Developer 3D (Udemy)", duration:"", type:"فيديو", videoUrl:"https://www.udemy.com/course/unitycourse2/"},
          {id:"gd-unity-08", title:"Unity XR (الواقع الافتراضي والمعزز)", duration:"", type:"فيديو", videoUrl:"https://www.coursera.org/specializations/unity-xr"},
          {id:"gd-unity-game-01", title:"اصنع أول لعبة لك", duration:"", type:"مشروع", videoUrl:"http://bit.ly/HTMAVG"},
          {id:"gd-unity-game-02", title:"نسخة من لعبة Mario", duration:"", type:"مشروع", videoUrl:"https://youtube.com/playlist?list=PLiRrp7UEG13Zsh4-Ir54fFoF7ATm540SL"},
          {id:"gd-unity-game-03", title:"لعبة Flappy Bird", duration:"", type:"مشروع", videoUrl:"https://bit.ly/2Mvuedk"},
          {id:"gd-unity-game-04", title:"لعبة Tower Defence", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/playlist?list=PLPV2KyIb3jR4u5jX8za5iU1cqnQPmbzG0"},
          {id:"gd-unity-game-05", title:"لعبة RPG في Unity", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/watch?v=nu5nyrB9U_o&list=PLPV2KyIb3jR4KLGCCAciWQ5qHudKtYeP7"},
          {id:"gd-unity-game-06", title:"لعبة FPS متعددة اللاعبين", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/watch?v=UK57qdq_lak&list=PLPV2KyIb3jR5PhGqsO7G4PsbEC_Al-kPZ"},
          {id:"gd-unity-git-01", title:"تعلّم Command Line", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAxzNO8ixW83Sf8FnLy_MkUT"},
          {id:"gd-unity-git-02", title:"تعلّم Git و GitHub", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLDoPjvoNmBAw4eOj58MZPakHjaO3frVMF"},
          {id:"gd-unity-docs", title:"التوثيق الرسمي لـ Unity", duration:"", type:"فيديو", videoUrl:"https://docs.unity3d.com/Manual/index.html"},
          {id:"gd-unity-brackeys", title:"قناة Brackeys (أرشيف كامل)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/user/Brackeys/playlists"},
          {id:"gd-unity-official", title:"Unity Learn الرسمي", duration:"", type:"فيديو", videoUrl:"https://learn.unity.com/"}
        ]},
        { id:"gd-res-unreal", title:"محرك Unreal Engine: كورسات وموارد (لمن يفضّل C++)", duration:"—", lessons:[
          {id:"gd-unreal-01", title:"تحميل Unreal Engine", duration:"", type:"فيديو", videoUrl:"https://www.unrealengine.com/en-US/download"},
          {id:"gd-unreal-02", title:"Getting Started with Unreal (raywenderlich)", duration:"", type:"فيديو", videoUrl:"https://www.raywenderlich.com/771-unreal-engine-4-tutorial-for-beginners-getting-started"},
          {id:"gd-unreal-03", title:"صناعة ألعاب للمبتدئين بـ UE4 (Virtus)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLL0cLF8gjBpqDdMoeid6Vl5roMl6xJQGC"},
          {id:"gd-unreal-04", title:"UE4 C++ (DevEnabled)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL9z3tc0RL6Z4JJS__Bge8O2mLwKUaG1eU"},
          {id:"gd-unreal-05", title:"كورسات Unreal Engine C++ (Reuben Ward)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PL3gCaTLUSAUsHG2BzsAs-HIeP08DyWtHh"},
          {id:"gd-unreal-06", title:"كورس مدفوع (اختياري): The Unreal Engine Developer Course — C++", duration:"", type:"فيديو", videoUrl:"https://ftuforum.com/the-unreal-engine-developer-course-learn-c-make-games-4/"},
          {id:"gd-unreal-07", title:"كورس مدفوع (اختياري): Unreal Multiplayer Master (Udemy)", duration:"", type:"فيديو", videoUrl:"https://www.udemy.com/course/unrealmultiplayer/"},
          {id:"gd-unreal-docs", title:"التوثيق الرسمي لـ Unreal Engine", duration:"", type:"فيديو", videoUrl:"https://docs.unrealengine.com/en-US/index.html"},
          {id:"gd-unreal-official", title:"بلايليست Unreal الرسمية", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/user/UnrealDevelopmentKit/search?query=tutorial"}
        ]},
        { id:"gd-res-gamejams", title:"Game Jams: اكسب خبرة حقيقية بالمنافسة", duration:"—", lessons:[
          {id:"gd-jam-01", title:"itch.io Game Jams — شارك بعد إتقان الأساسيات", duration:"", type:"فيديو", videoUrl:"https://itch.io/jams"}
        ]},
        { id:"gd-res-modelling", title:"النمذجة ثلاثية الأبعاد: Blender و Adobe Fuse", duration:"—", lessons:[
          {id:"gd-blender-dl", title:"تحميل Blender (مجاني ومفتوح المصدر)", duration:"", type:"فيديو", videoUrl:"https://www.blender.org/download/"},
          {id:"gd-blender-lvl1", title:"Blender LVL1", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=cBlXIJAawyg&list=PL-BTVXXeho5SFUrYlj_nL8rHjOdmt_uLF"},
          {id:"gd-blender-lvl2", title:"Blender LVL2", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=wTpSxsl7s_I&list=PL-BTVXXeho5TXgzvHUpjjWT4VLLMVWvVP"},
          {id:"gd-blender-lvl3", title:"Blender LVL3", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=pYAj3XO1gpU&list=PL-BTVXXeho5SkaGIWkWlz2FNs9GDQ1m3w"},
          {id:"gd-blender-fund", title:"بلايليست أساسيات Blender", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=MF1qEhBSfq4&list=PLa1F2ddGya_-UvuAqHAksYnB0qL9yWDO6"},
          {id:"gd-blender-donut", title:"تمرين الدونات الشهير (Blender Guru)", duration:"", type:"مشروع", videoUrl:"https://www.youtube.com/watch?v=TPrnSACiTJ4&list=PLexwJr_iILK7IkuhEeAYeN7aLV5AAXKa-"},
          {id:"gd-blender-lighting", title:"كورس احتراف الإضاءة Lighting Mastery", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=Ys4793edotw&list=PLjEaoINr3zgH9vCr47kSS5W8PEJBNIiwK"},
          {id:"gd-blender-clothing", title:"ملابس شخصيات Low Poly", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=szEeu6_b4fg"},
          {id:"gd-fuse-dl", title:"تحميل Adobe Fuse", duration:"", type:"فيديو", videoUrl:"https://www.adobe.com/mena_en/products/fuse.html"},
          {id:"gd-fuse-tut", title:"إنشاء شخصية بـ Adobe Fuse و Mixamo", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=FrPjNYk_JQ0"}
        ]},
        { id:"gd-res-music-sfx", title:"الموسيقى والمؤثرات الصوتية", duration:"—", lessons:[
          {id:"gd-music-theory", title:"بلايليست نظرية الموسيقى", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLUyDmNalB0rjteAmf8ciJ1zL2GqnzryS_"},
          {id:"gd-sound-eng", title:"بلايليست هندسة الصوت", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLRwSxn6RVkVIM9443VFgYHNkYuqbmEakk"},
          {id:"gd-flstudio-dl", title:"تحميل FL Studio (نسخة تجريبية)", duration:"", type:"فيديو", videoUrl:"https://www.image-line.com/fl-studio-download/"},
          {id:"gd-flstudio-tut", title:"بلايليست تعلّم FL Studio", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLusIP7Dkr3aoO-zDc_VT26YOOrsvw53Ff"},
          {id:"gd-lmms-dl", title:"تحميل LMMS (مجاني بالكامل)", duration:"", type:"فيديو", videoUrl:"https://lmms.en.uptodown.com/windows"},
          {id:"gd-lmms-tut", title:"بلايليست تعلّم LMMS", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=TrMTlpeSw8Y&list=PLqazFFzUAPc4K1To5JTtR3cskcdRifM1M"}
        ]},
        { id:"gd-res-graphics-programming", title:"برمجة الجرافيكس: OpenGL و DirectX (مستوى متقدم)", duration:"—", lessons:[
          {id:"gd-gp-opengl-01", title:"Learn OpenGL — مرجع شامل", duration:"", type:"فيديو", videoUrl:"https://learnopengl.com/Introduction"},
          {id:"gd-gp-opengl-02", title:"بلايليست Cherno OpenGL Series", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/playlist?list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2"},
          {id:"gd-gp-opengl-docs", title:"توثيق OpenGL API", duration:"", type:"فيديو", videoUrl:"http://docs.gl"},
          {id:"gd-gp-directx-01", title:"الدليل النهائي لـ DirectX", duration:"", type:"فيديو", videoUrl:"http://www.directxtutorial.com/"},
          {id:"gd-gp-directx-02", title:"قناة ChiliTomatoNoodle (DirectX)", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/channel/UCsyHonfwHi4fLb2lkq0DEAA"},
          {id:"gd-gp-directx-docs", title:"توثيق DirectX الرسمي", duration:"", type:"فيديو", videoUrl:"https://docs.microsoft.com/en-us/windows/win32/directx"}
        ]},
        { id:"gd-res-assets-books", title:"أصول جاهزة (Assets) وكتب مرجعية", duration:"—", lessons:[
          {id:"gd-asset-kenney", title:"Kenney.nl — أصول مجانية للألعاب", duration:"", type:"فيديو", videoUrl:"https://kenney.nl/assets"},
          {id:"gd-asset-store", title:"متجر أصول Unity الرسمي", duration:"", type:"فيديو", videoUrl:"https://assetstore.unity.com/"},
          {id:"gd-asset-2d-01", title:"OpenGameArt.org — رسومات 2D مجانية", duration:"", type:"فيديو", videoUrl:"http://opengameart.org"},
          {id:"gd-asset-2d-02", title:"Pexels — صور مجانية", duration:"", type:"فيديو", videoUrl:"http://www.pexels.com"},
          {id:"gd-asset-2d-03", title:"Texture Haven — تكستشرز مجانية", duration:"", type:"فيديو", videoUrl:"https://texturehaven.com/"},
          {id:"gd-asset-3d-01", title:"TurboSquid — موديلات 3D", duration:"", type:"فيديو", videoUrl:"http://www.turbosquid.com"},
          {id:"gd-asset-3d-02", title:"CGTrader — موديلات 3D مجانية", duration:"", type:"فيديو", videoUrl:"http://www.cgtrader.com/free-3d-models"},
          {id:"gd-asset-3d-03", title:"Sketchfab — معرض موديلات 3D", duration:"", type:"فيديو", videoUrl:"https://sketchfab.com"},
          {id:"gd-asset-3d-04", title:"NASA 3D Resources — موديلات فضائية مجانية", duration:"", type:"فيديو", videoUrl:"http://nasa3d.arc.nasa.gov"},
          {id:"gd-asset-sound-01", title:"Freesound.org — مؤثرات صوتية مجانية", duration:"", type:"فيديو", videoUrl:"http://www.freesound.org"},
          {id:"gd-asset-sound-02", title:"Incompetech — موسيقى مجانية بدون حقوق", duration:"", type:"فيديو", videoUrl:"http://incompetech.com"},
          {id:"gd-asset-sound-03", title:"KHInsider — موسيقى ألعاب", duration:"", type:"فيديو", videoUrl:"https://downloads.khinsider.com/"},
          {id:"gd-books-algo", title:"كتاب: Introduction to Algorithms (Third Edition)", duration:"", type:"قراءة", videoUrl:"https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/"},
          {id:"gd-books-unity", title:"كتاب: Unity Game Development Cookbook", duration:"", type:"قراءة", videoUrl:"https://www.oreilly.com/library/view/unity-game-development/9781492043036/"}
        ]},
      ]
    }]
  },
  // ===== أعمال =====
 
  { id:"ecommerce", name:"تجارة إلكترونية", cat:"أعمال", icon:"🛒", desc:"بناء متاجر إلكترونية وبيع المنتجات عبر الإنترنت.",
    longDesc:"متخصص التجارة الإلكترونية بيبني متاجر أونلاين ويدير عمليات البيع والشراء عبر الإنترنت. بيستخدم منصات زي Shopify أو WooCommerce، وبيشتغل على استراتيجيات التسعير والتسويق وتحسين تجربة الشراء. ممكن يبني متجره الخاص أو يدير متاجر لعملاء.", difficulty:"سهل", time:"1-3 أشهر", match:80, salary:"500-5000$+",
    tools:["Shopify","WooCommerce","Amazon","Facebook Shops","TikTok Shop"],
    daily:["إدارة المخزون والطلبات","تصوير وتحرير منتجات","حملات تسويقية","خدمة العملاء","تحليل المبيعات"],
    roadmap:[{t:"اختر نموذج العمل",d:"Dropshipping, Print-on-Demand, Private Label"},{t:"Shopify",d:"أنشئ متجرك في ساعة"},{t:"تصوير المنتجات",d:"صور احترافية بالهاتف"},{t:"Facebook & TikTok Ads",d:"استهداف المشترين"},{t:"تحسين وتوسيع",d:"اعتمد على البيانات"}],
    course:"https://www.shopify.com/blog/topics/guides", example:"متجر ناجح يدر 2000-10000$ شهرياً.",disabled: true },

  { id:"freelance", name:"عمل حر - فريلانس", cat:"أعمال", icon:"💼", desc:"تقديم خدماتك للعملاء حول العالم باستقلالية تامة.",
    longDesc:"الفريلانسر هو الشخص اللي بيقدم خدماته المهنية لعملاء مختلفين حول العالم بشكل مستقل من أي مكان. ممكن يكون مصمم، مطور، كاتب، أو أي تخصص آخر. بيستخدم منصات زي Upwork وFiverr وخمسات. الاستقلالية والحرية هما أهم مزايا هذا النمط من العمل.", difficulty:"سهل", time:"1-2 شهر", match:88, salary:"500-5000$+",
    tools:["Upwork","Fiverr","Freelancer","Khamsat","LinkedIn"],
    daily:["التواصل مع عملاء محتملين","تسليم مشاريع في الوقت","كتابة proposals","إدارة الوقت والأولويات"],
    roadmap:[{t:"حدد خدمتك",d:"ما الذي تجيده وتحب تقديمه؟"},{t:"بناء Portfolio",d:"3-5 مشاريع تُظهر مهارتك"},{t:"Fiverr أو Upwork",d:"أنشئ ملفك الشخصي"},{t:"أول صفقة",d:"اعمل بسعر تنافسي لتبني تقييماتك"},{t:"رفع الأسعار",d:"بعد 10 تقييمات إيجابية"}],
    course:"https://www.coursera.org/learn/freelance-fundamentals", example:"فريلانسر محترف يكسب 2000-8000$ شهرياً.",disabled: true },

  { id:"project-mgmt", name:"إدارة المشاريع", cat:"أعمال", icon:"📋", desc:"قيادة الفرق والمشاريع لتحقيق الأهداف في الوقت والميزانية.",
    longDesc:"مدير المشاريع بيقود فرق العمل لتحقيق أهداف محددة في وقت ومیزانية معينة. بيستخدم أدوات زي Jira وAsana وTrello، ويتعامل مع كل الأطراف من عملاء ومطورين ومصممين. شهادات زي PMP تفتح أبواب واسعة في الشركات الكبيرة براتب مرتفع.", difficulty:"متوسط", time:"4-8 أشهر", match:75, salary:"2000-6000$",
    tools:["Jira","Trello","Asana","Microsoft Project","Notion","Slack"],
    daily:["إدارة اجتماعات الفريق","متابعة تقدم المهام","حل عقبات الفريق","تواصل مع stakeholders"],
    roadmap:[{t:"أساسيات إدارة المشاريع",d:"Waterfall vs Agile"},{t:"شهادة PMP",d:"الأكثر اعترافاً عالمياً"},{t:"أدوات التخطيط",d:"Jira أو Asana أو Trello"},{t:"Agile & Scrum",d:"المنهجية الأحدث والأكثر طلباً"},{t:"تجربة عملية",d:"تطوع لإدارة مشروع تطوعي"}],
    course:"https://www.pmi.org/learning/training-development/online-courses", example:"مدير مشاريع معتمد يكسب 3000-7000$ شهرياً.",disabled: true },

  { id:"finance", name:"تحليل مالي", cat:"أعمال", icon:"💹", desc:"تحليل البيانات المالية واتخاذ قرارات استثمارية ذكية.",
    longDesc:"المحلل المالي بيحلل البيانات المالية للشركات ويقدم توصيات للاستثمار أو إدارة الميزانية. بيستخدم Excel وPower BI وأدوات تحليل متخصصة. مسار يتطلب دقة وتركيز عالي، لكن الرواتب فيه ممتازة خصوصاً في البنوك وشركات الاستثمار.", difficulty:"صعب", time:"8-12 شهر", match:68, salary:"2000-8000$",
    tools:["Excel","Bloomberg","Python","Power BI","QuickBooks"],
    daily:["تحليل القوائم المالية","بناء نماذج مالية","إعداد تقارير استثمارية","متابعة الأسواق"],
    roadmap:[{t:"محاسبة أساسيات",d:"الفهم الأساسي للمالية"},{t:"Excel المتقدم",d:"Financial Modeling"},{t:"شهادة CFA",d:"أو CPA للمحاسبين"},{t:"Python للمالية",d:"تحليل البيانات المالية"},{t:"تخصص",d:"Investment Banking, Equity Research"}],
    course:"https://corporatefinanceinstitute.com/", example:"محلل مالي مبتدئ يبدأ بـ 2000-4000$.",disabled: true },

  { id:"sales", name:"المبيعات والتفاوض", cat:"أعمال", icon:"🤝", desc:"إقناع العملاء وإتمام الصفقات — مهارة لا تُقدّر بثمن.",
    longDesc:"متخصص المبيعات بيقنع العملاء بقيمة المنتج أو الخدمة ويتمم الصفقات. بيعتمد على مهارات التواصل والإقناع وفهم احتياجات العميل. مسار لا يحتاج شهادة متخصصة، وفيه عمولات مفتوحة تجعل الدخل غير محدود لمن يتقنه.", difficulty:"سهل", time:"1-3 أشهر", match:82, salary:"800-unlimited",
    tools:["Salesforce","HubSpot CRM","LinkedIn Sales Navigator","Zoom"],
    daily:["التواصل مع عملاء جدد","عروض تقديمية للمنتجات","متابعة الصفقات","بناء علاقات طويلة المدى"],
    roadmap:[{t:"أساسيات البيع",d:"نفسية المشتري وعملية البيع"},{t:"سكريبت البيع",d:"كيف تقدم عرضك بثقة"},{t:"CRM",d:"إدارة علاقات العملاء"},{t:"فن التفاوض",d:"Win-Win Negotiation"},{t:"بناء Pipeline",d:"نظام ثابت لجلب عملاء جدد"}],
    course:"https://www.hubspot.com/resources/courses/sales-training", example:"مندوب مبيعات ناجح يكسب 2000-10000$ مع العمولات.",disabled: true },
  // ===== تواصل =====
  { id:"content", name:"كتابة محتوى", cat:"تواصل", icon:"✍️", desc:"إنشاء محتوى مكتوب يجذب القراء ويحقق الأهداف التجارية.",
    longDesc:"كاتب المحتوى بيكتب مقالات وتدوينات وأوصاف منتجات ومحتوى سوشيال يجذب القراء ويحقق أهداف الشركة. بيفهم SEO ويكتب بأسلوب يناسب الجمهور المستهدف. مسار سهل الدخول ومناسب لمن يحب الكتابة والبحث.", difficulty:"سهل", time:"1-3 أشهر", match:86, salary:"500-3000$",
    tools:["WordPress","Grammarly","ChatGPT","SEMrush","Notion"],
    daily:["كتابة مقالات ومنشورات","بحث عن كلمات مفتاحية","تحسين محتوى للـ SEO","تنسيق وتحرير المحتوى"],
    roadmap:[{t:"أسلوب الكتابة",d:"اكتب يومياً وطوّر أسلوبك"},{t:"SEO Copywriting",d:"اكتب للبشر والمحركات معاً"},{t:"أنواع المحتوى",d:"مقالات، إعلانات، بريد إلكتروني"},{t:"Portfolio",d:"10 مقالات في مواضيع متنوعة"},{t:"منصات العمل",d:"Upwork, Fiverr, المواقع العربية"}],
    course:"https://www.copyblogger.com/copywriting/", example:"كاتب محتوى محترف يكسب 1000-3000$ شهرياً." ,disabled: true},

  { id:"youtube", name:"يوتيوبر ومنشئ محتوى", cat:"تواصل", icon:"▶️", desc:"بناء جمهور على YouTube وتحقيق الدخل من المحتوى.",
    longDesc:"منشئ محتوى اليوتيوب بيبني قناة تضم محتوى متخصص يبني جمهوراً مخلصاً. بيعتمد على الأصالة والاتساق واختيار موضوع يجيد فيه. الدخل يأتي من إعلانات يوتيوب والرعايات والمنتجات. يحتاج وقتاً وصبراً لكن النتائج ضخمة على المدى البعيد.", difficulty:"متوسط", time:"6-18 شهر", match:79, salary:"0-unlimited",
    tools:["Camera","Adobe Premiere","CapCut","TubeBuddy","Canva"],
    daily:["تصوير ومونتاج فيديوهات","نشر والتفاعل مع التعليقات","تحسين SEO للفيديوهات","التعاون مع منشئين آخرين"],
    roadmap:[{t:"اختر نيشك",d:"موضوع تحبه وتعرفه جيداً"},{t:"جودة المعدات",d:"هاتف جيد + ميكروفون"},{t:"10 فيديوهات أولى",d:"تعلم من كل فيديو"},{t:"SEO والعناوين",d:"كيف تظهر في البحث"},{t:"Monetization",d:"AdSense + Sponsorships + Products"}],
    course:"https://creatoracademy.youtube.com/", example:"يوتيوبر ب100K مشترك يكسب 2000-10000$ شهرياً.",disabled: true },

  { id:"social-media", name:"إدارة السوشيال ميديا", cat:"تواصل", icon:"📱", desc:"بناء هويات رقمية قوية للشركات على منصات التواصل.",
    longDesc:"مدير السوشيال ميديا بيبني هوية رقمية قوية للشركات عبر منصات التواصل ويدير تفاعل الجمهور. بيخطط للمحتوى ويديره ويحلل النتائج ويبني مجتمع حول العلامة التجارية. من أسهل المسارات دخولاً والطلب عليه كبير جداً.", difficulty:"سهل", time:"1-2 شهر", match:83, salary:"500-2500$",
    tools:["Canva","Buffer","Hootsuite","Instagram Insights","Later"],
    daily:["إنشاء ونشر محتوى","الرد على التعليقات","تحليل الأداء","خطط محتوى شهرية"],
    roadmap:[{t:"أساسيات كل منصة",d:"Instagram, LinkedIn, TikTok, X"},{t:"إنشاء المحتوى",d:"Canva + تصوير بسيط"},{t:"Scheduling",d:"Buffer أو Hootsuite"},{t:"Analytics",d:"فهم الأرقام واتخاذ قرارات"},{t:"أول عميل",d:"محل محلي أو علامة تجارية صغيرة"}],
    course:"https://www.hubspot.com/resources/courses/social-media", example:"مدير سوشيال ميديا يكسب 800-2000$ لكل حساب.",disabled: true },
  { id:"translation", name:"ترجمة واللغويات", cat:"تواصل", icon:"🌐", desc:"نقل المعرفة والثقافة بين لغات العالم بدقة واحترافية.",
    longDesc:"المترجم بينقل المحتوى من لغة لأخرى بدقة مع الحفاظ على المعنى والأسلوب. بيتخصص في مجالات زي الترجمة القانونية أو الطبية أو الأدبية. مسار مناسب جداً لمن يتقن لغتين أو أكثر، ويفتح أبواب التعاون مع شركات دولية.", difficulty:"متوسط", time:"2-6 أشهر", match:74, salary:"500-3000$",
    tools:["SDL Trados","MemoQ","DeepL","CAT Tools","Grammarly"],
    daily:["ترجمة وثائق ومحتوى","مراجعة وتدقيق الترجمات","البحث في المصطلحات التقنية"],
    roadmap:[{t:"اختر تخصصك",d:"قانوني، طبي، تقني، أدبي"},{t:"CAT Tools",d:"أدوات الترجمة المساعدة بالحاسوب"},{t:"شهادة ترجمة",d:"ATA أو شهادة جامعية"},{t:"Portfolio",d:"ترجمات متنوعة لعرضها"},{t:"Proz.com",d:"أكبر منصة مترجمين في العالم"}],
    course:"https://www.proz.com/translator-training/", example:"مترجم متخصص يكسب 0.05-0.15$ للكلمة." ,disabled: true},
  { id:"writing", name:"كتابة إبداعية ورواية", cat:"تواصل", icon:"📚", desc:"نسج الكلمات إلى قصص تُغيّر القلوب والعقول.",
    longDesc:"الكاتب الإبداعي بينسج قصصاً وروايات ومحتوى أدبي يؤثر في القراء. بيعمل في نشر الكتب، أو كتابة سكريبتات، أو محتوى تسويقي إبداعي. يحتاج صبراً وإصراراً، لكنه مسار لمن يريد ترك أثر حقيقي في الثقافة.", difficulty:"متوسط", time:"3-12 شهر", match:72, salary:"200-3000$",
    tools:["Scrivener","Notion","Grammarly","Amazon KDP","Reedsy"],
    daily:["كتابة يومية منتظمة","بحث وتوثيق","تحرير ومراجعة","نشر وتسويق الأعمال"],
    roadmap:[{t:"اقرأ كثيراً",d:"لا كاتب بدون قارئ متعمّق"},{t:"اكتب يومياً",d:"500 كلمة يومياً كحد أدنى"},{t:"Workshop",d:"انضم لورش كتابة"},{t:"نشر ذاتي",d:"Amazon KDP مجاناً"},{t:"بناء جمهور",d:"Substack أو موقع شخصي"}],
    course:"https://www.masterclass.com/categories/writing", example:"روائي ناجح على Amazon يكسب 500-5000$ شهرياً." ,disabled: true},
  { id:"voiceover", name:"تعليق صوتي وتمثيل صوتي", cat:"تواصل", icon:"🎤", desc:"إضفاء الحياة على المحتوى بالصوت — مهنة رقمية ذات طلب متزايد.",
    longDesc:"الممثل الصوتي بيعطي صوته لإعلانات وأفلام وبودكاست وألعاب. بيستخدم ميكروفون احترافي وبرامج تسجيل بسيطة. الطلب عليه في ازدياد مع توسع المحتوى الرقمي والمسموع، والعمل فيه ممكن يكون من البيت بالكامل.", difficulty:"سهل", time:"2-4 أشهر", match:74, salary:"300-3000$",
    tools:["Audacity","Adobe Audition","Rode Microphone","Voices.com"],
    daily:["تسجيل مقاطع صوتية","تحرير وتنظيف الصوت","إرسال عروض للعملاء","تحسين الأداء الصوتي"],
    roadmap:[{t:"تدريب صوتي",d:"تنفس، نطق، جرس الصوت"},{t:"معدات تسجيل",d:"ميكروفون USB جيد + مكان صامت"},{t:"Demo Reel",d:"60 ثانية تعرض قدراتك"},{t:"منصات عمل",d:"Voices.com, Voice123, Fiverr"},{t:"تخصص",d:"إعلانات، كتب مسموعة، ألعاب"}],
    course:"https://www.voices.com/blog/how-to-become-a-voice-actor/", example:"فنان تعليق صوتي يكسب 300-2000$ شهرياً.",disabled: true},
  // ===== عملي =====
  { id:"cooking", name:"طباخ ومدرب طبخ", cat:"عملي", icon:"👨‍🍳", desc:"تحويل الطعام إلى فن وبناء مشروع من شغف الطبخ.",
    longDesc:"الطاهي المحترف أو مدرب الطبخ بيحول شغفه بالطعام لمصدر دخل — سواء بفتح مطعم أو خدمة طبخ منزلي أو تدريس الطبخ أونلاين. مسار عملي يحتاج إتقان وتطوير مستمر للوصفات وتقديم تجربة مميزة.", difficulty:"سهل", time:"2-6 أشهر", match:73, salary:"500-2000$",
    tools:["Instagram","YouTube","TikTok","منصات طلبات الطعام"],
    daily:["تجربة وصفات جديدة","تصوير أطباق","إدارة طلبات العملاء","تدريس دورات"],
    roadmap:[{t:"أتقن أطباقك",d:"10 أطباق احترافية كنقطة انطلاق"},{t:"السوشيال ميديا",d:"وثّق رحلتك على Instagram وTikTok"},{t:"Catering صغير",d:"أحداث خاصة ومناسبات"},{t:"دورات أونلاين",d:"علّم الآخرين ما تعرفه"},{t:"مطبخ سحابي",d:"Kitchen Cloud Model المستقبل"}],
    course:"https://www.youtube.com/@GordonRamsay", example:"طباخ من المنزل يكسب 500-2000$ من الطلبات والدورات." ,disabled: true},
  { id:"fitness", name:"مدرب لياقة بدنية", cat:"عملي", icon:"💪", desc:"مساعدة الناس على تحسين صحتهم ولياقتهم.",
    longDesc:"المدرب الرياضي بيساعد الناس يحققوا أهدافهم الصحية من خقسان وزن أو بناء عضلات أو تحسين لياقة. بيشتغل في صالات رياضية أو أونلاين مع عملاء من كل العالم. يحتاج شهادة معتمدة وخبرة عملية لبناء ثقة العملاء.", difficulty:"متوسط", time:"3-6 أشهر", match:75, salary:"800-4000$",
    tools:["Trainerize","MyFitnessPal","Zoom","Instagram","YouTube"],
    daily:["تدريب عملاء حضورياً أو أونلاين","كتابة خطط تدريبية وغذائية","محتوى على السوشيال","متابعة تقدم العملاء"],
    roadmap:[{t:"شهادة معتمدة",d:"ACE, NASM, أو ISSA"},{t:"التخصص",d:"Weight Loss, Muscle Building, Yoga"},{t:"أول عملاء",d:"أهل وأصحاب ومجتمع محلي"},{t:"Online Coaching",d:"وسّع نطاقك عبر الإنترنت"},{t:"محتوى",d:"YouTube وInstagram لبناء جمهور"}],
    course:"https://www.acefitness.org/", example:"مدرب لياقة أونلاين يكسب 2000-5000$ من 20 عميل." ,disabled: true},
  { id:"makeup", name:"مكياج وتجميل", cat:"عملي", icon:"💄", desc:"فن تحويل الجمال وبناء مشروع من شغف التجميل.",
    longDesc:"فنان المكياج بيحول الجمال لتحفة فنية في حفلات الأعراس والتصوير والمناسبات. بيبني قاعدة عملاء وسمعة عبر السوشيال ميديا. يمكن بناء أكاديمية تدريب أو بيع منتجات تجميل خاصة كمسار للنمو.", difficulty:"سهل", time:"2-6 أشهر", match:70, salary:"500-3000$",
    tools:["Instagram","TikTok","Canva","Booking App"],
    daily:["مواعيد مكياج للعملاء","محتوى تعليمي وإلهامي","تجربة منتجات جديدة","بناء شبكة عملاء"],
    roadmap:[{t:"تدريب احترافي",d:"دورة أو أكاديمية تجميل"},{t:"بناء Portfolio",d:"قبل وبعد على Instagram"},{t:"أول عملاء",d:"أفراح وحفلات"},{t:"YouTube",d:"تيوتوريالز تجلب عملاء"},{t:"منتجاتك",d:"خط مكياج خاص على المدى البعيد"}],
    course:"https://www.makeup.com/beauty-school-online", example:"فنانة مكياج تكسب 1000-3000$ شهرياً.",disabled: true },
  // ===== أكاديمي =====
  { id:"teaching", name:"تدريس ومعلم أونلاين", cat:"أكاديمي", icon:"📖", desc:"نشر المعرفة وتعليم الآخرين — مهنة ذات أثر لا يُنسى.",
    longDesc:"المعلم الأونلاين بيشارك خبرته ومعرفته مع طلاب من حول العالم عبر منصات زي YouTube وUdemy وZoom. مسار مناسب لأي شخص يتقن مجالاً ويجيد شرحه. الدخل يأتي من المنصات والاشتراكات والدروس الخاصة.", difficulty:"سهل", time:"1-3 أشهر", match:77, salary:"500-3000$",
    tools:["Zoom","Google Classroom","Udemy","Teachable","YouTube"],
    daily:["إعداد دروس ومحتوى","حصص أونلاين مع الطلاب","تصحيح وتقييم","تطوير المناهج"],
    roadmap:[{t:"مجالك",d:"في أي مادة أو مهارة أنت خبير؟"},{t:"أونلاين تيوتورينج",d:"منصات مثل Preply أو Wyzant"},{t:"دورة Udemy",d:"ادفع مرة واجمع أموالاً إلى الأبد"},{t:"YouTube",d:"محتوى تعليمي يجلب طلاباً"},{t:"برنامج تدريبي",d:"كورس مميز بسعر مميز"}],
    course:"https://teach.udemy.com/", example:"معلم أونلاين يكسب 1000-5000$ من الدورات والحصص.",disabled: true },
  { id:"research", name:"بحث علمي وكتابة أكاديمية", cat:"أكاديمي", icon:"🔬", desc:"المساهمة في المعرفة الإنسانية من خلال البحث الدقيق.",
    longDesc:"الباحث العلمي بيتعمق في موضوع متخصص ليضيف معرفة جديدة للإنسانية من خلال المنهج العلمي الدقيق. بيكتب أبحاثاً ومقالات أكاديمية وبيساهم في مؤتمرات علمية. مسار يحتاج صبراً وشغفاً حقيقياً بالمعرفة.", difficulty:"صعب", time:"12-24 شهر", match:65, salary:"1000-4000$",
    tools:["SPSS","R","MATLAB","Mendeley","LaTeX","Qualtrics"],
    daily:["جمع وتحليل البيانات","كتابة وتحرير الأوراق البحثية","قراءة الأدبيات العلمية","تقديم في مؤتمرات"],
    roadmap:[{t:"تحديد المجال",d:"ما الموضوع الذي تريد بحثه؟"},{t:"منهجية البحث",d:"Quantitative vs Qualitative"},{t:"إحصاء",d:"SPSS أو R أساسيات"},{t:"نشر",d:"ورقة بحثية في مجلة محكّمة"},{t:"Grants",d:"تمويل للأبحاث المستقلة"}],
    course:"https://www.coursera.org/learn/good-with-words-writing-and-editing", example:"باحث أكاديمي يكسب 1500-4000$ من المشاريع والاستشارات.",disabled: true },
  // ===== تقنية متخصصة =====
  { id:"seo", name:"متخصص SEO", cat:"تقني", icon:"🔍", desc:"رفع مواقع الويب في نتائج محركات البحث لجلب زوار مجاناً.",
    longDesc:"متخصص SEO بيجعل المواقع تظهر في أوائل نتائج Google بدون إعلانات مدفوعة. بيدرس الكلمات المفتاحية ويحسّن المحتوى والروابط والبنية التقنية. مهنة مربحة جداً لأن كل موقع يحتاجها وقلة المتخصصين الحقيقيين فيها.", difficulty:"متوسط", time:"3-6 أشهر", match:80, salary:"1000-4000$",
    tools:["Ahrefs","SEMrush","Google Search Console","Screaming Frog","Yoast"],
    daily:["تحليل الكلمات المفتاحية","تحسين صفحات المواقع","بناء روابط خلفية","تقارير الأداء الشهرية"],
    roadmap:[{t:"كيف تعمل محركات البحث",d:"الزحف، الفهرسة، الترتيب"},{t:"On-Page SEO",d:"تحسين المحتوى والعلامات"},{t:"Technical SEO",d:"سرعة الموقع وهيكله"},{t:"Link Building",d:"بناء سمعة رقمية"},{t:"Local SEO",d:"SEO للشركات المحلية"}],
    course:"https://ahrefs.com/seo", example:"متخصص SEO يكسب 1500-3500$ شهرياً.",disabled: true },
  { id:"wordpress", name:"تطوير WordPress", cat:"تقني", icon:"📝", desc:"بناء وتخصيص مواقع بـ WordPress — نظام 43% من الإنترنت.",
    longDesc:"مطور WordPress بيبني وبيخصص مواقع باستخدام أشهر نظام إدارة محتوى في العالم. بيشتغل على القوالب والإضافات والتصميم والحماية. مسار سهل الدخول ويفتح أبواب واسعة لأن WordPress يشغّل 43% من مواقع الإنترنت.", difficulty:"سهل", time:"2-4 أشهر", match:83, salary:"600-3000$",
    tools:["WordPress","Elementor","WooCommerce","Divi","PHP"],
    daily:["بناء مواقع جديدة","تخصيص وتطوير Themes","إضافة ميزات بالـ Plugins","صيانة ودعم فني"],
    roadmap:[{t:"WordPress أساسيات",d:"إنشاء موقع أول في ساعة"},{t:"Elementor",d:"Page Builder الشهير"},{t:"WooCommerce",d:"متاجر إلكترونية"},{t:"PHP & MySQL",d:"تخصيص أعمق"},{t:"استضافة وأداء",d:"cPanel, Cloudflare, Caching"}],
    course:"https://learn.wordpress.org/", example:"مطور WordPress يكسب 800-2500$ شهرياً." ,disabled: true},
  { id:"automate", name:"الأتمتة وـ No-Code", cat:"تقني", icon:"⚙️", desc:"بناء سير عمل أوتوماتيكية دون برمجة — مستقبل الإنتاجية.",
    longDesc:"متخصص الأتمتة بيبني سير عمل ذكية تشتغل تلقائياً بدون تدخل بشري — باستخدام أدوات No-Code زي Zapier وMake وn8n. بيوفر ساعات عمل ضائعة ويزيد الإنتاجية. مسار المستقبل لأي شخص يريد تحسين العمليات في أي مجال.", difficulty:"سهل", time:"1-3 أشهر", match:85, salary:"500-3000$",
    tools:["Make (Integromat)","Zapier","n8n","Notion","Airtable"],
    daily:["بناء سير عمل آلية","ربط أدوات مختلفة ببعض","استشارات الأتمتة","توفير وقت الشركات"],
    roadmap:[{t:"Make أو Zapier",d:"أسهل منصة بدء"},{t:"فهم الـ APIs",d:"كيف تتحدث التطبيقات مع بعض"},{t:"حالات استخدام",d:"HR, Sales, Marketing Automation"},{t:"Notion & Airtable",d:"قواعد بيانات بدون برمجة"},{t:"استشاري",d:"وفّر لكل شركة 10 ساعات أسبوعياً"}],
    course:"https://academy.make.com/", example:"مختص أتمتة يكسب 1000-4000$ بالاستشارات." ,disabled: true},
  { id:"data-analyst", name:"محلل بيانات", cat:"تقني", icon:"📈", desc:"تحويل البيانات الخام إلى قرارات ذكية تُحرّك الأعمال.",
    longDesc:"محلل البيانات بيحوّل الأرقام والجداول الخام لرؤى قابلة للتنفيذ تساعد الشركات. بيستخدم Excel وSQL وPower BI أو Tableau لعمل تقارير ولوحات بيانات. أسهل دخولاً من علم البيانات لكن رواتبه ممتازة والطلب عليه في كل صناعة.", difficulty:"متوسط", time:"4-8 أشهر", match:79, salary:"1500-5000$",
    tools:["Excel","SQL","Power BI","Tableau","Python Pandas"],
    daily:["استخراج بيانات من قواعد البيانات","بناء لوحات تحكم بصرية","إعداد تقارير أسبوعية وشهرية","دعم قرارات الإدارة بالبيانات"],
    roadmap:[{t:"Excel المتقدم",d:"Pivot Tables, VLOOKUP, Power Query"},{t:"SQL",d:"استخراج البيانات من قواعد البيانات"},{t:"Power BI أو Tableau",d:"لوحات تحكم تفاعلية"},{t:"Python أساسيات",d:"Pandas للتحليل التلقائي"},{t:"Portfolio",d:"3 مشاريع تحليل حقيقية"}],
    course:"https://www.kaggle.com/learn/data-analysis", example:"محلل بيانات يبدأ بـ 1500-3000$ شهرياً." ,disabled: true},
  { id:"qa", name:"ضمان جودة البرمجيات", cat:"تقني", icon:"🧩", desc:"ضمان خلو التطبيقات من الأخطاء قبل وصولها للمستخدمين.",
    longDesc:"مهندس ضمان الجودة بيتأكد إن البرمجيات تشتغل بدون أخطاء قبل وصولها للمستخدمين. بيكتب حالات اختبار ويشغّل اختبارات يدوية وأوتوماتيكية. مسار مثالي لمن يحب التفاصيل والدقة، وبيُعدّ نقطة دخول ممتازة لعالم التطوير.", difficulty:"متوسط", time:"3-6 أشهر", match:75, salary:"1000-4000$",
    tools:["Selenium","Cypress","Postman","JIRA","TestRail"],
    daily:["تصميم خطط اختبار","تنفيذ اختبارات يدوية وآلية","إبلاغ المطورين بالأخطاء","كتابة تقارير الجودة"],
    roadmap:[{t:"أساسيات QA",d:"أنواع الاختبارات ومنهجياتها"},{t:"Manual Testing",d:"كيف تختبر أي تطبيق"},{t:"Automation",d:"Selenium أو Cypress"},{t:"API Testing",d:"Postman وفهم الـ APIs"},{t:"Agile QA",d:"دورك في فريق Scrum"}],
    course:"https://www.ministryoftesting.com/", example:"مختص QA يبدأ بـ 1000-2500$ شهرياً." ,disabled: true},
  { id:"it-support", name:"دعم تقني وـ IT Support", cat:"تقني", icon:"🖥️", desc:"نقطة الانطلاق للعالم التقني — مهنة طلبها لا ينقطع.",
    longDesc:"متخصص الدعم التقني بيساعد المستخدمين في حل مشاكلهم التقنية يومياً — من إعادة تشغيل الأجهزة لإعداد الشبكات وحل المشاكل المعقدة. نقطة انطلاق ممتازة لعالم التقنية وبيفتح الباب لتخصصات أعمق.", difficulty:"سهل", time:"2-4 أشهر", match:78, salary:"600-2500$",
    tools:["Windows/macOS","Active Directory","ServiceNow","Cisco Basics","Azure AD"],
    daily:["حل مشاكل المستخدمين","إعداد وصيانة الأجهزة","إدارة حسابات وشبكات","توثيق الحلول التقنية"],
    roadmap:[{t:"CompTIA A+",d:"الشهادة الأولى في IT"},{t:"Networking",d:"CompTIA Network+"},{t:"Cloud",d:"Azure AZ-900 أو AWS Cloud Practitioner"},{t:"Active Directory",d:"إدارة المستخدمين والأنظمة"},{t:"تطور",d:"System Admin, Cloud Engineer, Security"}],
    course:"https://www.comptia.org/training/by-certification/a", example:"دعم تقني يبدأ بـ 600-1500$ وينمو بسرعة." ,disabled: true},
  { id:"product", name:"مدير المنتج (PM)", cat:"أعمال", icon:"🧭", desc:"قيادة بناء المنتجات الرقمية من الفكرة للإطلاق.", difficulty:"صعب", time:"8-14 شهر", match:74, salary:"3000-10000$",
    tools:["Jira","Figma","Mixpanel","Notion","Roadmunk","Slack"],
    daily:["تحديد أولويات الـ roadmap","مزامنة Engineering و Design","تحليل بيانات المستخدمين","تقديم للمسؤولين التنفيذيين"],
    roadmap:[{t:"Product Thinking",d:"كيف تفكر بالمنتجات الناجحة"},{t:"Agile & Scrum",d:"إدارة فريق التطوير"},{t:"Data Analytics",d:"اتخاذ قرارات بالبيانات"},{t:"شهادة PSPO",d:"أو دبلوم إدارة منتجات"},{t:"portfolio",d:"حالات دراسية لمشاريع قدتها"}],
    course:"https://productmanagerhq.com/", example:"PM في شركة تقنية يبدأ بـ 4000-8000$ شهرياً." ,disabled: true},
  { id:"consultant", name:"استشارات أعمال", cat:"أعمال", icon:"🧑‍💼", desc:"مساعدة الشركات على حل مشاكلها وتحقيق أهدافها.", difficulty:"صعب", time:"12-24 شهر", match:68, salary:"2000-10000$",
    tools:["PowerPoint","Excel","Notion","Miro","Salesforce"],
    daily:["تحليل مشاكل الشركات","اقتراح حلول استراتيجية","تقديم عروض للإدارة","متابعة التطبيق"],
    roadmap:[{t:"خبرة متخصصة",d:"لا بد من تخصص: تقني، مالي، تسويقي"},{t:"Consulting Frameworks",d:"McKinsey 7S, Porter's Five Forces"},{t:"مهارات عرض",d:"PowerPoint احترافي"},{t:"أول عميل",d:"شركة في دائرة معارفك"},{t:"سمعة ومراجع",d:"Case Studies ناجحة"}],
    course:"https://www.coursera.org/learn/business-strategy", example:"مستشار مستقل يكسب 3000-10000$ شهرياً." ,disabled: true},
  { id:"event", name:"تنظيم فعاليات", cat:"أعمال", icon:"🎉", desc:"تحويل الأفكار إلى تجارب لا تُنسى تجمع الناس.", difficulty:"متوسط", time:"3-6 أشهر", match:71, salary:"800-4000$",
    tools:["Eventbrite","Canva","Zoom","Notion","Trello"],
    daily:["تنسيق مع موردين وأماكن","إدارة ميزانيات الفعاليات","تسويق الفعاليات","حل المشاكل الطارئة"],
    roadmap:[{t:"أنواع الفعاليات",d:"أفراح، مؤتمرات، إطلاق منتجات"},{t:"تنظيم أول فعالية",d:"تطوعي أو لشركة صغيرة"},{t:"شهادة CMP",d:"Certified Meeting Professional"},{t:"شبكة علاقات",d:"موردون وأماكن وشركاء"},{t:"شركتك",d:"وكالة فعاليات مستقلة"}],
    course:"https://www.mpi.org/learning", example:"منظم فعاليات مستقل يكسب 1500-5000$ للفعالية." ,disabled: true},
  { id:"hr", name:"موارد بشرية", cat:"أعمال", icon:"👥", desc:"بناء فرق عمل ناجحة ورعاية تجربة الموظف.", difficulty:"متوسط", time:"4-8 أشهر", match:70, salary:"1000-3500$",
    tools:["LinkedIn Recruiter","Workday","SAP SuccessFactors","BambooHR"],
    daily:["استقطاب ومقابلة مرشحين","إدارة عمليات التوظيف","برامج تطوير الموظفين","حل النزاعات"],
    roadmap:[{t:"أساسيات HR",d:"قانون العمل والإجراءات"},{t:"Recruitment",d:"كيف تجذب أفضل المواهب"},{t:"شهادة SHRM",d:"الشهادة الدولية المعتمدة"},{t:"HR Analytics",d:"البيانات في خدمة الموارد البشرية"},{t:"تخصص",d:"Talent Acquisition, L&D, HRBP"}],
    course:"https://www.shrm.org/LearningAndCareer/", example:"مختص موارد بشرية يبدأ بـ 1200-2500$." ,disabled: true},
  { id:"architecture", name:"هندسة معمارية وتصميم داخلي", cat:"إبداعي", icon:"🏛️", desc:"تصميم المباني والمساحات التي يعيش ويعمل فيها الناس.", difficulty:"صعب", time:"12-24 شهر", match:67, salary:"1000-5000$",
    tools:["AutoCAD","Revit","SketchUp","Lumion","3ds Max"],
    daily:["رسم مخططات معمارية","تصميم مساحات داخلية","التواصل مع العملاء والمقاولين","متابعة مراحل التنفيذ"],
    roadmap:[{t:"AutoCAD",d:"أساس الرسم الهندسي"},{t:"Revit",d:"BIM للمشاريع الكبيرة"},{t:"SketchUp",d:"نمذجة سريعة ومرئية"},{t:"Portfolio",d:"مشاريع خيالية ومشاريع تخرج"},{t:"تدريب",d:"سنة في مكتب هندسي"}],
    course:"https://www.autodesk.com/learning/", example:"مصمم داخلي مستقل يكسب 1500-4000$ شهرياً.",disabled: true },
  { id:"podcasting", name:"البودكاست", cat:"تواصل", icon:"🎙️", desc:"إنشاء بودكاست يبني جمهوراً مخلصاً ويصنع تأثيراً.", difficulty:"سهل", time:"1-3 أشهر", match:72, salary:"0-3000$",
    tools:["Anchor","Audacity","GarageBand","Buzzsprout","Descript"],
    daily:["تحضير حلقات جديدة","مونتاج وتحرير الصوت","التواصل مع ضيوف","توزيع على منصات البودكاست"],
    roadmap:[{t:"فكرة ومفهوم",d:"ما الذي ستتحدث عنه؟ لمن؟"},{t:"معدات صوت",d:"ميكروفون USB بسيط يكفي"},{t:"أول 10 حلقات",d:"استمر حتى تجد صوتك"},{t:"توزيع",d:"Spotify, Apple Podcasts, Anghami"},{t:"تحقيق دخل",d:"رعايات + Patreon + منتجات"}],
    course:"https://anchor.fm/blog", example:"بودكاستر ب10K مستمع يكسب 500-2000$ من الرعايات." ,disabled: true},
  { id:"pr", name:"علاقات عامة وإعلام", cat:"تواصل", icon:"📰", desc:"بناء سمعة وصورة إيجابية للأفراد والمؤسسات.", difficulty:"متوسط", time:"4-8 أشهر", match:68, salary:"1000-4000$",
    tools:["PRWeb","Meltwater","Cision","Google Alerts","LinkedIn"],
    daily:["كتابة بيانات صحفية","التواصل مع الصحفيين","إدارة الأزمات","بناء علاقات إعلامية"],
    roadmap:[{t:"أساسيات الإعلام",d:"كيف تعمل وسائل الإعلام"},{t:"كتابة صحفية",d:"أسلوب الهرم المقلوب"},{t:"بناء شبكة علاقات",d:"صحفيون ومؤثرون ومحررون"},{t:"إدارة الأزمات",d:"كيف تحمي سمعة عميلك"},{t:"شهادات",d:"PRSA أو IABC"}],
    course:"https://www.prsa.org/learning/career-resources/", example:"مختص علاقات عامة يبدأ بـ 1000-2500$." ,disabled: true},
  { id:"blockchain", name:"بلوكشين وـ Web3", cat:"تقني", icon:"🔗", desc:"بناء تطبيقات على تقنية البلوكشين — مستقبل الإنترنت اللامركزي.",
    longDesc:"متخصص البلوكشين بيبني تطبيقات لامركزية على شبكة البلوكشين — من عقود ذكية لتطبيقات DeFi وNFTs. بيستخدم Solidity وWeb3.js. مجال ناشئ بفرص ضخمة وشُح في المتخصصين الحقيقيين، والرواتب فيه من الأعلى عالمياً.", difficulty:"صعب", time:"8-14 شهر", match:70, salary:"3000-12000$",
    tools:["Solidity","Ethereum","Hardhat","MetaMask","IPFS"],
    daily:["كتابة Smart Contracts","اختبار الأمان","متابعة أخبار الـ Web3","بناء DApps"],
    roadmap:[{t:"Blockchain Fundamentals",d:"كيف تعمل؟ وما فائدتها؟"},{t:"Solidity",d:"لغة Smart Contracts"},{t:"Ethereum Development",d:"Hardhat + Remix"},{t:"DeFi & NFTs",d:"فهم التطبيقات العملية"},{t:"مشروع حقيقي",d:"ابنِ DApp بسيط ونشره"}],
    course:"https://cryptozombies.io/", example:"مطور Smart Contracts يكسب 4000-10000$ شهرياً.",disabled: true },
  { id:"ux-research", name:"باحث تجربة المستخدم", cat:"تقني", icon:"🧪", desc:"فهم المستخدمين وتحويل الرؤى إلى تحسينات منتج ملموسة.",
    longDesc:"باحث تجربة المستخدم بيتخصص في فهم سلوك المستخدمين واحتياجاتهم من خلال مقابلات واستبيانات واختبارات. بيحول ما يجمعه من بيانات نوعية لتوصيات تحسّن المنتج. مسار مطلوب في شركات التكنولوجيا الكبيرة.", difficulty:"متوسط", time:"4-8 أشهر", match:76, salary:"2000-6000$",
    tools:["Maze","Hotjar","UserTesting","Optimal Workshop","Dovetail"],
    daily:["إجراء مقابلات مستخدمين","تحليل بيانات الاستخدام","كتابة تقارير البحث","التعاون مع المصممين"],
    roadmap:[{t:"منهجيات البحث",d:"Qualitative vs Quantitative"},{t:"User Interviews",d:"كيف تسأل الأسئلة الصحيحة"},{t:"Usability Testing",d:"اختبار الواجهات مع مستخدمين"},{t:"تحليل البيانات",d:"تحويل البيانات لقرارات"},{t:"Portfolio",d:"3 دراسات حالة بحثية كاملة"}],
    course:"https://www.nngroup.com/articles/", example:"باحث UX يبدأ بـ 2500-4500$ شهرياً." ,disabled: true},
  { id:"network", name:"مهندس شبكات", cat:"تقني", icon:"🌐", desc:"تصميم وإدارة الشبكات التي تربط العالم.",
    longDesc:"مهندس الشبكات بيصمم ويدير الشبكات اللي بتخلي الإنترنت والأنظمة الداخلية تشتغل. بيتعامل مع راوترات وسويتشات وأنظمة حماية. يحتاج شهادات معتمدة زي CCNA من Cisco، وهو أساس لا غنى عنه في أي بنية تحتية تقنية.", difficulty:"صعب", time:"8-14 شهر", match:70, salary:"2000-7000$",
    tools:["Cisco IOS","Wireshark","GNS3","Packet Tracer","Juniper"],
    daily:["إعداد وصيانة شبكات","تشخيص وحل مشاكل الشبكة","تحسين الأداء والأمان","توثيق البنية التحتية"],
    roadmap:[{t:"CompTIA Network+",d:"أساس أي مسار شبكات"},{t:"CCNA",d:"شهادة Cisco المبتدئة"},{t:"Routing & Switching",d:"المفهوم الأساسي للشبكات"},{t:"Wireless & Security",d:"WiFi وأمان الشبكات"},{t:"CCNP",d:"المستوى المتقدم"}],
    course:"https://www.netacad.com/", example:"مهندس شبكات يبدأ بـ 2000-4000$ شهرياً." ,disabled: true},
  { id:"cloud", name:"مهندس سحابي", cat:"تقني", icon:"☁️", desc:"إدارة البنية التحتية السحابية للشركات الكبيرة والناشئة.",
    longDesc:"مهندس الحوسبة السحابية بيدير وبيبني البنية التحتية الرقمية للشركات على منصات زي AWS وGoogle Cloud وAzure. يُعد من أعلى الرواتب في القطاع التقني، مع نمو هائل في الطلب مع تحول الشركات من الـ On-Premise للـ Cloud.", difficulty:"صعب", time:"6-12 شهر", match:73, salary:"3000-10000$",
    tools:["AWS","Azure","Google Cloud","Terraform","Ansible"],
    daily:["نشر وإدارة موارد السحاب","تحسين التكاليف","بناء بنى تحتية آمنة","أتمتة العمليات"],
    roadmap:[{t:"أساسيات السحاب",d:"ما هو Cloud وكيف يعمل"},{t:"AWS Certified Cloud Practitioner",d:"نقطة انطلاق ممتازة"},{t:"AWS Solutions Architect",d:"الشهادة الأكثر طلباً"},{t:"Terraform",d:"Infrastructure as Code"},{t:"FinOps",d:"تحسين تكاليف السحاب"}],
    course:"https://aws.amazon.com/training/", example:"مهندس AWS Solutions Architect يكسب 4000-9000$.",disabled: true },
  { id:"law", name:"قانون وإرشاد قانوني", cat:"أكاديمي", icon:"⚖️", desc:"حماية الحقوق وتقديم المشورة القانونية.", difficulty:"صعب", time:"12-24 شهر", match:62, salary:"1500-6000$",
    tools:["Westlaw","LexisNexis","Microsoft Office","Case Management Software"],
    daily:["مراجعة عقود ووثائق","استشارات قانونية","أبحاث قانونية","تحضير ملفات قضائية"],
    roadmap:[{t:"أساسيات القانون",d:"شهادة جامعية في القانون"},{t:"التدريب",d:"سنة تدريب في مكتب محاماة"},{t:"التخصص",d:"تجاري، عائلي، جنائي، ملكية فكرية"},{t:"ترخيص المهنة",d:"اجتياز امتحان النقابة"},{t:"مستشار مستقل",d:"استشارات قانونية أونلاين"}],
    course:"https://www.coursera.org/learn/public-international-law", example:"محامٍ مستقل يكسب 2000-6000$ شهرياً.",disabled: true },
  { id:"medicine-alt", name:"طب بديل وعلاج طبيعي", cat:"أكاديمي", icon:"🌿", desc:"مساعدة الناس على الشفاء والتعافي بطرق طبيعية.", difficulty:"متوسط", time:"6-12 شهر", match:67, salary:"800-3000$",
    tools:["زيوت عطرية","أعشاب طبية","أجهزة علاج طبيعي","منصات حجز"],
    daily:["جلسات علاج مع المرضى","إعداد خطط علاجية","متابعة التطور","تعليم المرضى"],
    roadmap:[{t:"شهادة معتمدة",d:"علاج طبيعي أو حجامة أو أعشاب"},{t:"تخصص",d:"اختر طريقتك: رياضة، أعشاب، طاقة"},{t:"مكان عمل",d:"مراكز صحية أو عيادة خاصة"},{t:"اعمل أونلاين",d:"استشارات عبر الإنترنت"},{t:"ترخيص",d:"التسجيل في الجهات المختصة"}],
    course:"https://www.annmariegianni.com/", example:"معالج طبيعي يكسب 1000-3000$ شهرياً.",disabled: true },
  { id:"carpentry", name:"نجارة وديكور", cat:"عملي", icon:"🪵", desc:"صنع قطع خشبية جميلة وتطوير مهارة حرفية نادرة.", difficulty:"متوسط", time:"4-8 أشهر", match:65, salary:"500-3000$",
    tools:["أدوات نجارة يدوية وكهربائية","Fusion 360","Instagram"],
    daily:["تصميم وصناعة قطع خشبية","تسليم طلبات العملاء","شراء وإدارة المواد","نشر الأعمال على السوشيال"],
    roadmap:[{t:"أساسيات النجارة",d:"الأدوات والأخشاب الأساسية"},{t:"أول مشروع",d:"طاولة أو رف بسيط"},{t:"التصميم",d:"AutoCAD أو Fusion 360 أساسيات"},{t:"Portfolio",d:"صوّر أعمالك على Instagram"},{t:"مشاريع مخصصة",d:"فرنيتشر حسب الطلب"}],
    course:"https://www.youtube.com/@3x3Custom", example:"نجار محترف يكسب 1000-3000$ من المشاريع المخصصة." ,disabled: true},
  { id:"electrician", name:"كهربائي وطاقة شمسية", cat:"عملي", icon:"⚡", desc:"مهنة حرفية ضرورية مع مستقبل واعد في الطاقة المتجددة.", difficulty:"متوسط", time:"4-8 أشهر", match:68, salary:"800-3000$",
    tools:["أدوات كهرباء","مقياس متعدد","AutoCAD Electrical","شهادات كهربائية"],
    daily:["تركيب وصيانة أنظمة كهربائية","فحص وتشخيص أعطال","تركيب ألواح شمسية","مشاريع بناء جديد"],
    roadmap:[{t:"شهادة كهرباء",d:"دورة في معهد تقني معتمد"},{t:"تدريب عملي",d:"سنة مع كهربائي محترف"},{t:"ترخيص مهني",d:"رخصة ممارسة المهنة"},{t:"الطاقة الشمسية",d:"شهادة تركيب الألواح الشمسية"},{t:"أعمالك الخاصة",d:"مكتب خدمات كهربائية"}],
    course:"https://www.electriciantalk.com/", example:"كهربائي محترف يكسب 1500-4000$ شهرياً." ,disabled: true},
  { id:"erp", name:"مستشار ERP وأنظمة المؤسسات", cat:"أعمال", icon:"🏢", desc:"تطبيق وإدارة أنظمة التخطيط المؤسسي الضخمة.", difficulty:"صعب", time:"12-18 شهر", match:64, salary:"2500-8000$",
    tools:["SAP","Oracle ERP","Microsoft Dynamics","Odoo","Salesforce"],
    daily:["تخصيص وتطبيق أنظمة ERP","تدريب فرق العمل","تحليل العمليات التجارية","حل مشاكل الأنظمة"],
    roadmap:[{t:"أساسيات أعمال",d:"كيف تعمل الشركات الكبيرة"},{t:"Odoo",d:"ERP مفتوح المصدر للبداية"},{t:"SAP Fundamentals",d:"أو Oracle ERP"},{t:"شهادة معتمدة",d:"SAP Certified Application Associate"},{t:"تخصص",d:"Finance, HR, Supply Chain في ERP"}],
    course:"https://learning.sap.com/", example:"مستشار SAP يكسب 3000-8000$ شهرياً." ,disabled: true},
  // ===== اللغات والترجمة =====
  { id:"english-prof", name:"تعلم الإنجليزية الاحترافية", cat:"لغات", icon:"🇬🇧", desc:"إتقان الإنجليزية للتواصل والعمل والترقي المهني في أي مجال.", difficulty:"متوسط", time:"6-12 شهر", match:90, salary:"زيادة 30-50% على الراتب",
    tools:["Duolingo","Coursera","YouTube","iTalki","Grammarly","ChatGPT"],
    daily:["تعلم 10 كلمات جديدة","ممارسة المحادثة 20 دقيقة","مشاهدة محتوى إنجليزي","كتابة جمل تطبيقية"],
    roadmap:[{t:"الأساسيات",d:"الحروف، الأرقام، الجمل البسيطة"},{t:"A2 - مبتدئ",d:"تعريف النفس، طلب الأشياء، حياة يومية"},{t:"B1 - متوسط",d:"محادثات عمل، فهم المقالات"},{t:"B2 - فوق المتوسط",d:"عروض تقديمية، اجتماعات"},{t:"C1 - متقدم",d:"كتابة محترفة، تفاوض، قيادة"}],
    course:"https://www.coursera.org/learn/learn-english-for-career-development", example:"موظف بإنجليزية جيدة يحصل على راتب أعلى بـ 40% في المتوسط.",
    tracks:[{
      id:"english-professional-track", title:"مسار تعلم اللغة الإنجليزية", subtitle:"من A1 للـ C1 خطوة بخطوة",
      longDesc:"مسار CAT لتعلم الإنجليزية بيوديك من مستوى المبتدئ (A1) لحد الاحتراف (C1) بترتيب تصاعدي واحد. كل مستوى فيه أسابيع بمحتوى متكامل: قاعدة نحوية، موضوع وكلمات جديدة، نص قراءة، تدريب استماع، ومهام تطبيقية (Grammar, Reading, Listening, Writing) باستخدام أدوات زي iStoria وELSA Speak وQuillBot. المسار بيركز على الممارسة العملية اليومية مش الحفظ بس.",
      level:"مبتدئ", duration:"5 مستويات (A1 → C1)", totalLessons:26, icon:"🇬🇧", color:"#0f7a9a", coverImage:"assets/cat-academic.svg",
      intro:{
        tools:[
          {name:"iStoria", purpose:"قصص تفاعلية لتحسين القراءة والفهم", url:"https://istoria.app/"},
          {name:"ELSA Speak / Stimuler", purpose:"مدرّب نطق بالذكاء الاصطناعي", url:"https://elsaspeak.com/en"},
          {name:"Quizlet", purpose:"بطاقات تعلم تفاعلية للمفردات", url:"https://quizlet.com/"},
          {name:"QuillBot", purpose:"تصحيح وتحسين الكتابة", url:"https://quillbot.com/"},
          {name:"Oxford / Cambridge Dictionary", purpose:"قواميس EN-EN موثوقة", url:"https://www.oxfordlearnersdictionaries.com/"},
          {name:"iTalki / Cambly", purpose:"محادثة مباشرة مع متحدثين أصليين", url:"https://www.italki.com/ar"}
        ],
        accounts:[
          {name:"Duolingo", why:"تدريب يومي قصير وممتع", url:"https://ar.duolingo.com/"},
          {name:"YouGlish", why:"سماع نطق الكلمات في سياقات حقيقية", url:"https://youglish.com/"},
          {name:"BBC Learning English", why:"محتوى مجاني منظم لكل المستويات", url:"https://www.bbc.co.uk/learningenglish/"}
        ],
        plan:[
          {title:"A1 (Beginner)", duration:"3-4 أشهر (3-6 ساعات/أسبوع)", goal:"مفردات أساسية، قواعد بسيطة، عبارات يومية، فيديوهات تعليمية وقصص أطفال"},
          {title:"A2 (Elementary)", duration:"3-6 أشهر (5-10 ساعات/أسبوع)", goal:"محادثات بسيطة، الأزمنة الحاضر والماضي، مواقف شائعة، مقاطع أفلام وكتب مبسطة"},
          {title:"B1 (Intermediate)", duration:"6-9 أشهر (7-10 ساعات/أسبوع)", goal:"قواعد أعقد، محادثات طليقة، عروض تقديمية، أفلام ومسلسلات وكتب"},
          {title:"B2 (Upper-Intermediate)", duration:"6-12 شهر (10-12 ساعة/أسبوع)", goal:"نقاشات متقدمة، لغة رسمية وغير رسمية، أخبار ومقالات"},
          {title:"C1 (Advanced)", duration:"9-12 شهر (10-15 ساعة/أسبوع)", goal:"مواضيع معقدة، طلاقة قريبة من الناطقين الأصليين، إدارة المحادثات، أفلام وثائقية"}
        ],
        challenge:[
          {name:"iTalki", url:"https://www.italki.com/ar"},
          {name:"HelloTalk", url:"https://www.hellotalk.com/"}
        ]
      },
      courses:[
        { id:"eng-tools-library", title:"مكتبة الأدوات الموصى بها", duration:"مرجع دائم", lessons:[
          {id:"eng-tools-speaking", title:"أدوات المحادثة والنطق بالذكاء الاصطناعي: iTalki, Cambly, ELSA Speak, Stimuler, Talkpal, Character AI, Tandem, HelloTalk, Hilokal, Pronounce", duration:"", type:"قراءة", videoUrl:"https://www.italki.com/ar"},
          {id:"eng-tools-vocab", title:"أدوات المفردات والقواميس: Quizlet, Oxford Dictionary, Cambridge Dictionary, Urban Dictionary, U-Dictionary, Longman, Promova, Idiom Land", duration:"", type:"قراءة", videoUrl:"https://quizlet.com/"},
          {id:"eng-tools-reading", title:"أدوات القراءة: ReadTheory, Project Gutenberg, Oxford Bookworms Library, Super Easy Reading, News in Levels, Breaking News English", duration:"", type:"قراءة", videoUrl:"https://readtheory.org/"},
          {id:"eng-tools-listening", title:"البودكاست والاستماع: Voscreen, Castbox, ELLLO, BBC Learning English Podcasts, VOA Learning English, TED Talks, ESL Pod, Shadowing B", duration:"", type:"قراءة", videoUrl:"https://www.voscreen.com/"},
          {id:"eng-tools-apps", title:"تطبيقات عامة للمستوى المبتدئ: Duolingo, Memrise, Busuu, LingoDeer, Falou", duration:"", type:"قراءة", videoUrl:"https://ar.duolingo.com/"},
          {id:"eng-tools-community", title:"مجتمعات ودردشة: Discord (English Hub, English)، QuillBot للكتابة، Baamboozle وSkribbl كألعاب قواعد", duration:"", type:"قراءة", videoUrl:"https://discord.gg/english"}
        ]},
        { id:"eng-a1", title:"A1 (Beginner) - الأساسيات", duration:"3-4 أشهر", lessons:[
          {id:"eng-a1-overview", title:"محاور المستوى: مفردات أساسية، قواعد بسيطة، عبارات يومية، فيديوهات تعليمية، قصص أطفال — 3-6 ساعات أسبوعياً", duration:"", type:"قراءة", videoUrl:"https://ar.duolingo.com/"}
        ]},
        { id:"eng-a2-week1", title:"A2 - الأسبوع 1: The History of Famous Landmarks", duration:"أسبوع", lessons:[
          {id:"eng-a2-w1-grammar", title:"Grammar: Articles — 'the' or no article", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=EZqG2Ag6yjg"},
          {id:"eng-a2-w1-vocab", title:"Vocabulary (10 كلمات): Landmark, Engineer, Symbol, Protect, Construction, Tourist, Gift, Freedom, Culture, View", duration:"", type:"قراءة", videoUrl:""},
          {id:"eng-a2-w1-reading", title:"Reading: The History of a Famous Landmark (Eiffel Tower, Great Wall, Statue of Liberty)", duration:"", type:"قراءة", videoUrl:""},
          {id:"eng-a2-w1-listening", title:"Listening Practice", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=ayO9N6s3qIY"},
          {id:"eng-a2-w1-tasks", title:"مهام الأسبوع: Grammar Quiz + Reading (iStoria) + Listening (ELSA Speak/Stimuler/Character AI/Pronounce) + Writing (Promova/Idiom Land/Quizlet/QuillBot)", duration:"", type:"تدريب", videoUrl:"https://forms.gle/wqRG4WoRgH84DUF68"}
        ]},
        { id:"eng-a2-week2", title:"A2 - الأسبوع 2: How People Feel About Their Jobs", duration:"أسبوع", lessons:[
          {id:"eng-a2-w2-grammar", title:"Grammar: Adjectives and prepositions", duration:"", type:"فيديو", videoUrl:"https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/adjectives-prepositions"},
          {id:"eng-a2-w2-vocab", title:"Vocabulary (11 كلمة): unappreciated, stressful, underpaid, repetitive, satisfied, rewarding, colleagues, salary, depend, environment, motivate", duration:"", type:"قراءة", videoUrl:""},
          {id:"eng-a2-w2-reading", title:"Reading: How People Feel About Their Jobs", duration:"", type:"قراءة", videoUrl:""},
          {id:"eng-a2-w2-listening", title:"Listening: Work-Life Balance", duration:"", type:"فيديو", videoUrl:"https://learnenglish.britishcouncil.org/skills/listening/b1-listening/work-life-balance"},
          {id:"eng-a2-w2-tasks", title:"مهام الأسبوع: Grammar + Reading + Listening + Writing forms", duration:"", type:"تدريب", videoUrl:"https://forms.gle/bQiUj3PrVGFXSWcu5"}
        ]},
        { id:"eng-b1-week1", title:"B1 - الأسبوع 1: Daily Life of a Modern Minimalist", duration:"أسبوع", lessons:[
          {id:"eng-b1-w1-grammar", title:"Grammar: Present simple — 'have got'", duration:"", type:"فيديو", videoUrl:"https://youtu.be/T8anieZo4-I?si=3UcvAYGMAzTsnRmr"},
          {id:"eng-b1-w1-vocab", title:"Vocabulary (13 كلمة): Essentials, Clutter, Mindset, Serene, Spacious, Fast-paced, Possessions, Wardrobe, Gadgets, Tidy, Distraction, Clutter-free, Stress-free", duration:"", type:"قراءة", videoUrl:""},
          {id:"eng-b1-w1-reading", title:"Reading: Daily Life of a Modern Minimalist (Emma's story)", duration:"", type:"قراءة", videoUrl:""},
          {id:"eng-b1-w1-listening", title:"Listening Practice", duration:"", type:"فيديو", videoUrl:"https://youtu.be/ELOKiH1UEe0?si=VvgsVpqmbfsk04jN"},
          {id:"eng-b1-w1-tasks", title:"مهام الأسبوع: Grammar quiz + Reading (iStoria) + Listening (ELSA Speak/Stimuler) + Writing (Promova/Idiom Land/Quizlet/QuillBot)", duration:"", type:"تدريب", videoUrl:"https://docs.google.com/forms/d/e/1FAIpQLSc8xj6n_bzGihHQBWCHkplt2TtGkEZdi-RHTOB0VdyjRnK8XA/viewform"}
        ]},
        { id:"eng-b1-week2", title:"B1 - الأسبوع 2: استماع إضافي", duration:"أسبوع", lessons:[
          {id:"eng-b1-w2-listening", title:"Listening Practice", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=cCh0EDHKTcc"}
        ]},
        { id:"eng-b2-week1", title:"B2 - الأسبوع 1: The Importance of Proper Punctuation in Writing", duration:"أسبوع", lessons:[
          {id:"eng-b2-w1-grammar", title:"Grammar: Capital letters and apostrophes", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=yNK5GRXsLJM"},
          {id:"eng-b2-w1-vocab", title:"Vocabulary (10 كلمات): Clarity, Precision, Contraction, Possession, Ambiguity, Consistency, Emphasis, Legibility, Syntax, Misinterpretation", duration:"", type:"قراءة", videoUrl:""},
          {id:"eng-b2-w1-reading", title:"Reading: The Power of Punctuation in Writing", duration:"", type:"قراءة", videoUrl:""},
          {id:"eng-b2-w1-listening", title:"Listening Practice", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=KUKgJsvoDUk"},
          {id:"eng-b2-w1-tasks", title:"مهام الأسبوع: Grammar + Reading (iStoria) + Listening (ELSA Speak/Stimuler) + Writing (يوميات، 10 جمل من المفردات، Phrasal verb + Idiom، Shadowing بالذكاء الاصطناعي)", duration:"", type:"تدريب", videoUrl:"https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/capital-letters-apostrophes"}
        ]},
        { id:"eng-c1-week1", title:"C1 - الأسبوع 1: How Social Media Impacts Us", duration:"أسبوع", lessons:[
          {id:"eng-c1-w1-grammar", title:"Grammar: Advanced present simple and continuous", duration:"", type:"فيديو", videoUrl:"https://www.youtube.com/watch?v=W3HdjN3cLiM"},
          {id:"eng-c1-w1-vocab", title:"Slang Vocabulary: tea, ghost, flex, fomo, pmo, rizz, no cap, cooked", duration:"", type:"قراءة", videoUrl:""},
          {id:"eng-c1-w1-reading", title:"Reading: How Social Media Shapes Modern Society", duration:"", type:"قراءة", videoUrl:""},
          {id:"eng-c1-w1-listening", title:"Listening Practice", duration:"", type:"فيديو", videoUrl:"https://youtu.be/xCP6uWvdIrw?si=UAit2MdyDd9ld275"},
          {id:"eng-c1-w1-quiz", title:"اختبار قواعد: 20 سؤال اختيار من متعدد على الأزمنة (present/future forms)", duration:"", type:"quiz", videoUrl:"https://wordwall.net/resource/66978041/present-perfect-simple-or-continuous"},
          {id:"eng-c1-w1-writing", title:"مهام الكتابة: فقرة عن تأثير السوشيال ميديا عليك + فقرة تستخدم 3 idioms (Hit the nail on the head, Burn the midnight oil, Spill the beans)", duration:"", type:"تدريب", videoUrl:""}
        ]}
      ]
    }] },

  { id:"translation", name:"مترجم محترف", cat:"لغات", icon:"🌐", desc:"الترجمة المكتوبة والشفهية للوثائق، المحتوى، والمؤتمرات.", difficulty:"متوسط", time:"8-14 شهر", match:75, salary:"500-3000$",
    tools:["SDL Trados","Wordfast","DeepL","Proz.com","Upwork"],
    daily:["ترجمة 500-1000 كلمة يومياً","مراجعة الترجمات","البحث في المصطلحات المتخصصة","بناء الذاكرة الترجمية"],
    roadmap:[{t:"إتقان اللغة المصدر",d:"مستوى C1 على الأقل"},{t:"أدوات الترجمة CAT",d:"SDL Trados أو Wordfast"},{t:"التخصص",d:"قانوني، طبي، تقني، أو تسويقي"},{t:"بناء البورتفوليو",d:"10 نماذج ترجمة متنوعة"},{t:"الفريلانس",d:"Proz.com, Upwork, ترجمان"}],
    course:"https://www.coursera.org/specializations/translation-theory-and-practice", example:"مترجم طبي متخصص يكسب 2000-4000$ شهرياً." },

  { id:"arabic-content", name:"محرر لغوي ومدقق إملائي", cat:"لغات", icon:"✍️", desc:"تدقيق وتحرير المحتوى العربي لوسائل الإعلام والشركات والناشرين.", difficulty:"سهل", time:"3-6 شهر", match:80, salary:"300-1500$",
    tools:["Microsoft Word","Ayaspell","Google Docs","Grammarly Arabic"],
    daily:["مراجعة 2000-5000 كلمة","تصحيح الأخطاء النحوية","التأكد من الأسلوب","تنسيق النصوص"],
    roadmap:[{t:"إتقان النحو والإملاء",d:"قواعد اللغة العربية الفصحى"},{t:"أدوات التدقيق",d:"إضافات التدقيق الإملائي"},{t:"التخصص",d:"أدبي، إعلامي، أو تقني"},{t:"بناء العملاء",d:"دور نشر، مواقع إخبارية، شركات"}],
    course:"https://www.edraak.org/", example:"مدقق لغوي يعمل مع 5 عملاء ثابتين ويكسب 1000-2000$ شهرياً." },

  { id:"spanish", name:"تعلم الإسبانية", cat:"لغات", icon:"🇪🇸", desc:"تعلم الإسبانية لفتح أسواق أمريكا اللاتينية وإسبانيا.", difficulty:"متوسط", time:"8-14 شهر", match:65, salary:"فرص عمل إضافية + سفر",
    tools:["Duolingo","Babbel","SpanishPod101","iTalki","Pimsleur"],
    daily:["جلسة 30 دقيقة يومياً","تعلم 10 كلمات جديدة","مشاهدة مسلسل إسباني","محادثة مع ناطق أصلي أسبوعياً"],
    roadmap:[{t:"الأبجدية والنطق",d:"صوتيات الإسبانية"},{t:"A1-A2",d:"تقديم النفس والحياة اليومية"},{t:"B1",d:"سرد القصص والتعبير عن الآراء"},{t:"B2",d:"محادثات عمل وأخبار"},{t:"العمل",d:"ترجمة إسبانية أو فرص في الشركات الدولية"}],
    course:"https://www.duolingo.com/course/es/ar/Learn-Spanish", example:"المترجم عربي-إسباني نادر ومطلوب بشدة في الأسواق الدولية." },

  { id:"french", name:"تعلم الفرنسية", cat:"لغات", icon:"🇫🇷", desc:"الفرنسية تفتح أسواق أفريقيا وكندا وأوروبا وتعزز التوظيف.", difficulty:"متوسط", time:"8-14 شهر", match:60, salary:"فرص دولية + علاوة",
    tools:["Duolingo","Frantastique","TV5Monde","iTalki","Assimil"],
    daily:["درس 30-45 دقيقة يومياً","قراءة مقال فرنسي","مشاهدة يوتيوب بالفرنسية","كتابة جمل يومية"],
    roadmap:[{t:"الأصوات والنطق",d:"الأحرف والنطق الفرنسي الخاص"},{t:"A1-A2",d:"التحيات والأعداد والحياة اليومية"},{t:"B1",d:"التسوق والسفر والمواعيد"},{t:"B2",d:"عمل ومجتمع"},{t:"التخصص",d:"دبلوماسية، أعمال، أو ترجمة فرنسية"}],
    course:"https://www.tv5mondeplus.com/apprendre-le-francais", example:"فرنسا وكندا ودول أفريقية تبحث باستمرار عن ناطقين بالعربية والفرنسية." },

  { id:"sign-language", name:"لغة الإشارة", cat:"لغات", icon:"🤟", desc:"تعلم لغة الإشارة للتواصل مع ذوي الإعاقة السمعية والعمل كمترجم.", difficulty:"متوسط", time:"6-12 شهر", match:70, salary:"400-1500$",
    tools:["SignSchool","YouTube","Handspeak","دورات الجمعيات المحلية"],
    daily:["ممارسة الأحرف والأرقام","تعلم 5 إشارات جديدة","مشاهدة محتوى لغة إشارة","ممارسة مع الصم"],
    roadmap:[{t:"الأبجدية",d:"تهجئة الحروف بالإشارة"},{t:"المفردات اليومية",d:"تحيات، أرقام، ألوان"},{t:"المحادثة",d:"جمل كاملة ومحادثات بسيطة"},{t:"التخصص",d:"مدرسي، قانوني، أو طبي"},{t:"الشهادة",d:"اجتياز اختبار معتمد"}],
    course:"https://www.signschool.com/", example:"مترجم لغة إشارة في المحاكم يكسب 1500-3000$ شهرياً." },

  { id:"chinese", name:"تعلم الصينية (الماندرين)", cat:"لغات", icon:"🇨🇳", desc:"الصينية تفتح أكبر اقتصاد بالعالم وتمنحك ميزة تنافسية هائلة.", difficulty:"صعب", time:"18-36 شهر", match:50, salary:"زيادة راتب 50%+",
    tools:["HelloChinese","Anki","ChinesePod","Pleco","HSK Online"],
    daily:["تعلم 5 رموز هانزي يومياً","استماع 15 دقيقة","ممارسة النطق التوني","مراجعة بطاقات Anki"],
    roadmap:[{t:"النطق التوني",d:"4 نبرات الماندرين"},{t:"HSK 1-2",d:"150-300 مفردة أساسية"},{t:"HSK 3-4",d:"محادثات يومية وعمل"},{t:"HSK 5-6",d:"متقدم وأعمال"},{t:"الممارسة",d:"صداقات صينية وعمل مشترك"}],
    course:"https://www.hellochinese.com/", example:"مترجم عربي-صيني مطلوب جداً مع تنامي العلاقات الاقتصادية." , disabled: true},

  // ===== المهارات الحياتية =====
  { id:"time-management", name:"إدارة الوقت والإنتاجية", cat:"حياتية", icon:"⏰", desc:"إتقان تنظيم الوقت وزيادة الإنتاجية باستخدام أساليب علمية مثبتة.", difficulty:"سهل", time:"1-3 شهر", match:95, salary:"قيمة مضافة لأي وظيفة",
    tools:["Notion","Todoist","Google Calendar","Forest","Pomodoro Timer"],
    daily:["تخطيط اليوم صباحاً","تطبيق Pomodoro 25/5","مراجعة الأهداف مساءً","حذف المشتتات ساعة واحدة"],
    roadmap:[{t:"GTD Basics",d:"Getting Things Done — نظام ديفيد ألن"},{t:"Time Blocking",d:"حجز كتل زمنية للمهام"},{t:"Pomodoro",d:"25 دقيقة تركيز + 5 راحة"},{t:"Digital Tools",d:"Notion أو Todoist لتتبع المهام"},{t:"مراجعة أسبوعية",d:"تقييم الأداء وتعديل الخطة"}],
    course:"https://www.coursera.org/learn/work-smarter-not-harder", example:"موظف يتقن إدارة الوقت يُنجز ضعف عمل زملائه في نفس الساعات." },

  { id:"communication-skills", name:"مهارات التواصل والإقناع", cat:"حياتية", icon:"🗣️", desc:"تطوير مهارات التحدث والاستماع والإقناع في البيئات المهنية والشخصية.", difficulty:"سهل", time:"2-4 شهر", match:90, salary:"ضرورة لأي وظيفة",
    tools:["Toastmasters","Coursera","كتاب فن الإقناع","مرايا التدريب"],
    daily:["تمرين التحدث 10 دقائق","الاستماع الفعّال في محادثة","تدوين ملاحظة من كتاب تواصل","مشاهدة خطاب TED"],
    roadmap:[{t:"الاستماع الفعّال",d:"الإصغاء بلا مقاطعة وبالتأكيد"},{t:"لغة الجسد",d:"التواصل البصري والوضعية والإيماءات"},{t:"التحدث العام",d:"Toastmasters أو دورات الخطابة"},{t:"الإقناع",d:"مبادئ سيالديني الستة"},{t:"التفاوض",d:"أساليب المفاوضة الناجحة}"}],
    course:"https://www.toastmasters.org/", example:"الموظف ذو مهارات التواصل العالية يُرقّى أسرع بمرتين من زملائه." },

  { id:"financial-literacy", name:"الوعي المالي الشخصي", cat:"حياتية", icon:"💰", desc:"إدارة الميزانية الشخصية، الادخار، الاستثمار الذكي وبناء الثروة.", difficulty:"سهل", time:"2-4 شهر", match:88, salary:"حماية وبناء ثروة",
    tools:["Excel","YNAB","Mint","كتاب أبي الغني وأبي الفقير","Investopedia"],
    daily:["تسجيل المصروفات اليومية","تخصيص 10% للادخار","قراءة 10 دقائق في الاستثمار","مراجعة الميزانية الأسبوعية"],
    roadmap:[{t:"الميزانية الشخصية",d:"قاعدة 50/30/20 للدخل"},{t:"صندوق الطوارئ",d:"3-6 أشهر مصروفات محفوظة"},{t:"سداد الديون",d:"طريقة كرة الثلج"},{t:"الاستثمار",d:"صناديق مؤشر، أسهم، ذهب"},{t:"بناء الثروة",d:"الدخل السلبي والتنويع"}],
    course:"https://www.coursera.org/learn/personal-finance", example:"من يبدأ الادخار والاستثمار في سن 25 يبني ثروة تعادل ضعف من يبدأ في 35." },

  { id:"critical-thinking", name:"التفكير النقدي وحل المشكلات", cat:"حياتية", icon:"🧩", desc:"تطوير القدرة على التحليل المنطقي واتخاذ القرارات الصحيحة تحت الضغط.", difficulty:"متوسط", time:"3-6 شهر", match:85, salary:"ضرورة للقيادة والإدارة",
    tools:["MindMeister","SWOT Analysis","كتب الفلسفة العملية","Harvard Business Review"],
    daily:["تحليل مشكلة واحدة يومياً","كتابة pros & cons لأي قرار","التساؤل: لماذا × 5 مرات","قراءة وجهة نظر مختلفة"],
    roadmap:[{t:"أساليب التفكير",d:"Lateral Thinking وSix Thinking Hats"},{t:"تحليل المشكلات",d:"Root Cause Analysis والـ 5 Whys"},{t:"اتخاذ القرار",d:"نماذج القرار والتحيزات المعرفية"},{t:"التطبيق",d:"تطبيق على حالات حقيقية"},{t:"التفكير الاستراتيجي",d:"رؤية بعيدة المدى وتخطيط السيناريوهات}"}],
    course:"https://www.edx.org/learn/critical-thinking", example:"المدراء ذوو التفكير النقدي يقودون فرقاً أكثر إنتاجية وأقل أخطاء." },

  { id:"leadership", name:"مهارات القيادة وإدارة الفرق", cat:"حياتية", icon:"👑", desc:"تطوير كفاءات القيادة: تحفيز الفريق، التفويض، وإدارة الصراعات.", difficulty:"متوسط", time:"4-8 شهر", match:80, salary:"علاوة قيادية + ترقية",
    tools:["كتب القيادة","Coursera","LinkedIn Learning","مجموعات قيادة","Mentoring"],
    daily:["مسؤولية مبادرة واحدة يومياً","تحفيز شخص في الفريق","حل خلاف بطريقة بنّاءة","قراءة 15 دقيقة في القيادة"],
    roadmap:[{t:"القيادة الذاتية",d:"إدارة نفسك قبل الآخرين"},{t:"العمل الجماعي",d:"فهم ديناميكيات الفريق"},{t:"التفويض",d:"متى وكيف تُفوّض المهام"},{t:"إدارة الصراعات",d:"تحويل الخلاف لفرصة"},{t:"القيادة الاستراتيجية",d:"رؤية، تخطيط، تنفيذ"}],
    course:"https://www.coursera.org/learn/everyday-leadership", example:"المدير بمهارات قيادة ممتازة يُحقق أهداف فريقه بكفاءة 40% أعلى." },

  { id:"emotional-intelligence", name:"الذكاء العاطفي", cat:"حياتية", icon:"💙", desc:"فهم مشاعرك ومشاعر الآخرين، وإدارتها لبناء علاقات مهنية وشخصية أقوى.", difficulty:"سهل", time:"2-5 شهر", match:85, salary:"جودة حياة + فرص أفضل",
    tools:["كتاب Emotional Intelligence لدانييل جولمان","Headspace","تمارين الوعي الذاتي","Journal"],
    daily:["تسجيل المشاعر في مذكرة","تمرين التنفس الواعي 5 دقائق","التعاطف مع موقف شخص آخر","ممارسة الامتنان"],
    roadmap:[{t:"الوعي الذاتي",d:"تحديد مشاعرك بدقة"},{t:"إدارة المشاعر",d:"التعامل مع الغضب والقلق والحزن"},{t:"الوعي الاجتماعي",d:"قراءة مشاعر الآخرين"},{t:"إدارة العلاقات",d:"التواصل التعاطفي والصادق"},{t:"القيادة العاطفية",d:"تحفيز الفريق بالتفهم}"}],
    course:"https://www.coursera.org/learn/emotional-intelligence-leadership", example:"الموظفون ذوو الذكاء العاطفي المرتفع يحصلون على تقييمات أداء أعلى بـ 20%." },

  { id:"negotiation", name:"فن التفاوض والإقناع", cat:"حياتية", icon:"🤝", desc:"إتقان أساليب التفاوض في العمل، الراتب، والعلاقات التجارية.", difficulty:"متوسط", time:"2-4 شهر", match:80, salary:"زيادة دخل مباشرة",
    tools:["كتاب Never Split the Difference","Coursera","تمارين لعب الأدوار","التفاوض الحقيقي"],
    daily:["تحديد هدف تفاوضي واضح","ممارسة BATNA في موقف حقيقي","قراءة لغة جسد الطرف الآخر","تسجيل نتيجة التفاوض"],
    roadmap:[{t:"أساسيات التفاوض",d:"BATNA، ZOPA، وأسلوب الفائز-فائز"},{t:"الإقناع",d:"مبادئ التأثير لسيالديني"},{t:"التفاوض على الراتب",d:"كيف تحصل على ما تستحقه"},{t:"التجارة",d:"التفاوض مع الموردين والعملاء"},{t:"الدبلوماسية",d:"التفاوض في المواقف الصعبة}"}],
    course:"https://www.coursera.org/learn/negotiation", example:"من يتفاوض بشكل جيد على راتبه يكسب 10-20% أكثر طوال مسيرته." },
];


const PSYCH_DATA = [
  { emoji:"😨", title:"الخوف من البدء", desc:"تشعر أنك لست جاهزاً بعد وتؤجل باستمرار", scenario:"تجلس أمام الشاشة وعندك فكرة رائعة — لكن لا تبدأ. تقول لنفسك: 'لم أتعلم كافياً بعد'. هذه هي ثقافة الانتظار المشلول.",
    exercises:[{t:"مبدأ الـ 2 دقيقة",d:"إذا استغرق الأمر أقل من دقيقتين، افعله الآن. طبّق هذا على أي بداية."},{t:"رحلة البطل المعكوسة",d:"اكتب نهاية القصة أولاً: أنت بعد سنة تعمل في مجالك وتكسب منه. ثم اعمل للخلف."},{t:"تحديد أصغر خطوة ممكنة",d:"ما هو أبسط شيء يمكنك فعله الآن؟ فعله فقط."}],
    daily:"اليوم: سجّل مقطعاً صوتياً 30 ثانية تشرح فيه مهارة تجيدها. لا يوجد شيء اسمه 'جاهز تماماً'." },
  { emoji:"😰", title:"القلق من المستقبل", desc:"تفكير مستمر فيما سيحدث ومخاوف من المجهول", scenario:"تجد نفسك تضع السيناريوهات السوداء: 'لو فشلت؟ لو لم يُعجب الناس عملي؟ لو لم يكن كافياً؟' القلق يأكل طاقتك قبل أن تبدأ.",
    exercises:[{t:"تدريب التنفس العميق",d:"استنشق 4 ثواني، احبس 7، أخرج 8. كرر 4 مرات. علمياً يُهدئ الجهاز العصبي."},{t:"سؤال الأسوأ",d:"اكتب: ما أسوأ شيء يمكن أن يحدث؟ ثم اكتب: كيف سأتعامل معه؟ الخوف ينهار أمام الخطة."},{t:"صندوق القلق",d:"خصص 15 دقيقة يومياً للقلق فقط — خارجها، أعد القلق لصندوقه."}],
    daily:"اليوم: تحدث مع شخص تثق به عن قلقك. مجرد الكلام يُخفف الحمل إلى النصف." },
  { emoji:"🤯", title:"التفكير الزائد", desc:"دوامة من الأفكار تمنعك من اتخاذ القرارات", scenario:"تُحلل وتُحلل حتى تُشلّ. تقارن 10 خيارات وفي النهاية لا تختار أي منها. هذا ما يُسمى Analysis Paralysis — وعلاجه بسيط.",
    exercises:[{t:"قاعدة الـ 10/10/10",d:"اسأل نفسك: هل سيهمني هذا القرار بعد 10 دقائق؟ 10 أشهر؟ 10 سنوات؟ ضعه في منظوره الصحيح."},{t:"تحديد وقت للقرار",d:"أعطِ نفسك 24 ساعة فقط لاتخاذ أي قرار غير استثنائي. القرار الجيد الآن أفضل من القرار المثالي لاحقاً."},{t:"كتابة الأفكار",d:"أخرج كل أفكارك على ورقة أو Notion. الكتابة تُخرج الأفكار من دوامتها."}],
    daily:"اليوم: اتخذ قراراً واحداً صغيراً توقفت عنده كثيراً. نفّذه في 5 دقائق." },
  { emoji:"😔", title:"فقدان الدافعية", desc:"تشعر بالبرود تجاه أهدافك وتجد صعوبة في البدء", scenario:"كانت لديك أحلام كبيرة، لكن الآن تجلس وتحدق في الفراغ. الدافعية رحلت. هذا طبيعي — لكن له علاج.",
    exercises:[{t:"إيجاد 'السبب'",d:"اسأل نفسك 5 مرات 'لماذا؟' لتصل لدافعك الحقيقي."},{t:"الجرعة الصغيرة",d:"العب 'game' مع نفسك: لديك 10 دقائق فقط للعمل على هدفك. عادةً ستستمر."},{t:"التواصل مع الملهمين",d:"اقرأ قصة نجاح شخص يشبهك. اشترك في Newsletter ملهم."}],
    daily:"اليوم: افتح ما توقفت عنده واعمل عليه 15 دقيقة فقط. لا أكثر." },
  { emoji:"😤", title:"الخوف من الفشل", desc:"تتجنب المحاولة خوفاً من الفشل والإحراج", scenario:"فكرة الفشل تُشلّك. تفضّل عدم المحاولة على أن تُحاول وتفشل.",
    exercises:[{t:"إعادة تعريف الفشل",d:"الفشل = تجربة + تعلم. كل محاولة تمنحك بيانات لا تُقدّر بثمن."},{t:"التحصين المسبق",d:"تخيل الفشل بالتفصيل. كيف ستتعامل معه؟ هذا يُخفف خوفك منه."},{t:"مخزن الانتصارات",d:"اكتب 10 أشياء نجحت فيها في حياتك."}],
    daily:"اليوم: افعل شيئاً واحداً كنت خائفاً منه. أي شيء. ولو كان صغيراً جداً." },
  { emoji:"😶", title:"الشك بالنفس", desc:"صوت داخلي يقول 'أنت لا تستحق وأنت لا تكفي'", scenario:"يُقارنك بالآخرين. يُذكّرك بفشلاتك السابقة. يقول 'من أنت لتحقق هذا؟' هذا هو الـ Impostor Syndrome.",
    exercises:[{t:"التحدث للنفس بلطف",d:"تخيل صديقك يقول لك ما تقوله لنفسك. هل ستقبله منه؟"},{t:"Evidence Log",d:"احتفظ بملف يحوي تعليقات الشكر والإطراء التي تلقيتها."},{t:"الكفاءة ≠ الكمال",d:"أنت لا تحتاج أن تكون الأفضل. تحتاج فقط أن تكون كافياً لتُساعد شخصاً واحداً."}],
    daily:"اليوم: اكتب 5 أشياء تجيدها حقاً. لا تُقلل من قيمتها." },
];


// [تحديث] تم إزالة المدربين الوهميين نهائياً.
// قائمة المدربين الآن حيّة 100% من جدول trainer_applications في Supabase.
// أي مستخدم مسجّل دخول يقدر يضيف نفسه كمدرب من صفحة "المدربون" وتفاصيله تظهر تلقائياً هنا.
// هذا المتغير باقٍ فاضي فقط كـ fallback أمان لو فشل الاتصال بالسيرفر — لا تحط فيه بيانات وهمية.
const MENTORS_DATA = [];


const PLAN_7 = [
  {d:1,t:"اعرف نفسك",b:"أكمل الاختبار الكامل واحفظ نتيجتك. اقرأ وصف أعلى 3 مسارات تطابقاً."},
  {d:2,t:"ابحث عمقاً",b:"اقضِ ساعة في قراءة تفاصيل مسارك الأول. شاهد فيديو يوتيوب عن حياة يوم في هذا المجال."},
  {d:3,t:"تواصل مع محترف",b:"ابحث على LinkedIn عن شخص يعمل في مجالك وأرسل له رسالة مهذبة لطرح سؤال واحد."},
  {d:4,t:"أول تجربة عملية",b:"اصنع شيئاً صغيراً في مجالك. تصميم؟ فتح Figma. برمجة؟ ابنِ صفحة HTML."},
  {d:5,t:"ابنِ ملفك الشخصي",b:"أنشئ حساباً على LinkedIn. أضف صورة احترافية وعنواناً يعكس توجهك المهني."},
  {d:6,t:"تعلّم أداة أساسية",b:"خصص 3 ساعات لتعلم الأداة الأولى في مسارك. Figma للتصميم، VSCode للبرمجة."},
  {d:7,t:"اشارك واستقطب آراء",b:"انشر ما صنعته هذا الأسبوع. على LinkedIn أو هنا في المجتمع."},
];


const PLAN_30 = [
  {d:1,t:"الأساس: الاختبار والتحليل",b:"أكمل الاختبار، احفظ نتائجك، وابدأ قراءة عميقة لمسارك المختار."},
  {d:3,t:"تعلم الأداة الرئيسية",b:"3 ساعات يومياً على الأداة الأساسية في مجالك."},
  {d:5,t:"المشروع الأول",b:"ابدأ مشروع وهمي صغير يُطبق ما تعلمته."},
  {d:7,t:"Portfolio أساسي",b:"أنشئ ملفاً يعرض مشاريعك. Behance, GitHub, أو موقع شخصي."},
  {d:10,t:"تواصل مع متخصصين",b:"تواصل مع 5 أشخاص في مجالك على LinkedIn."},
  {d:14,t:"المشروع الثاني",b:"مشروع أكبر وأكثر تعقيداً من الأول."},
  {d:18,t:"أول محاولة للكسب",b:"انشر خدمتك على Fiverr أو Upwork بسعر تنافسي."},
  {d:21,t:"شبكة علاقات",b:"انضم لمجموعات Discord أو Slack في مجالك."},
  {d:25,t:"أول عميل",b:"سوّق نفسك لدائرة معارفك. العميل الأول عادةً من أقرب الناس."},
  {d:30,t:"تقييم وتخطيط الشهر الثاني",b:"قيّم ما تعلمته وما حققته. ضع أهداف الشهر التالي."},
];


const ALL_BADGES = [
  { key:"first_step",    icon:"👣", label:"أول خطوة",          desc:"سجّل دخولك لأول مرة" },
  { key:"first_quiz",    icon:"🧠", label:"أتممت الاختبار",    desc:"أكمل اختبار الميول" },
  { key:"first_track",   icon:"🗺️", label:"اخترت مسارك",      desc:"ابدأ أول مسار مهني" },
  { key:"streak_3",      icon:"🔥", label:"3 أيام متواصلة",    desc:"ادخل 3 أيام متتالية" },
  { key:"streak_7",      icon:"🌟", label:"أسبوع كامل",        desc:"7 أيام متواصلة" },
  { key:"ch_5",          icon:"⚡", label:"منجز نشط",          desc:"أتمم 5 تحديات يومية" },
  { key:"level_3",       icon:"🏆", label:"وصلت المستوى 3",    desc:"تحتاج 450 نقطة" },
  { key:"community_member", icon:"🌍", label:"عضو المجتمع",    desc:"نشر أول منشور" },
];


const ALL_CHALLENGES = [
  { id:"c01", icon:"🎤", title:"سجّل مقطع بصوتك 30 ثانية",           sub:"تحدي الخوف من الكلام",       pts:20 },
  { id:"c02", icon:"📝", title:"اكتب 3 أهداف لهذا الأسبوع",           sub:"تحدي الوضوح والتخطيط",      pts:15 },
  { id:"c03", icon:"🔗", title:"تواصل مع شخص في مجالك",               sub:"تحدي بناء الشبكة",          pts:25 },
  { id:"c04", icon:"📚", title:"اقرأ مقالاً في مجالك 15 دقيقة",       sub:"تحدي التعلم المستمر",       pts:10 },
  { id:"c05", icon:"🎨", title:"صمم شيئاً بسيطاً باستخدام Canva",     sub:"تحدي الإبداع اليومي",       pts:20 },
  { id:"c06", icon:"💪", title:"اعمل 20 دقيقة تمريناً بدنياً",        sub:"تحدي الصحة والطاقة",        pts:15 },
  { id:"c07", icon:"🧠", title:"شاهد فيديو تعليمياً في مجالك",        sub:"تحدي التطوير المهني",       pts:10 },
  { id:"c08", icon:"✍️", title:"اكتب تأملاً عمّا تعلمته اليوم",       sub:"تحدي الوعي الذاتي",         pts:15 },
  { id:"c09", icon:"🌐", title:"أضف مشروعاً في ملفك الشخصي",          sub:"تحدي بناء الـ Portfolio",   pts:30 },
  { id:"c10", icon:"🤝", title:"ساعد شخصاً في المجتمع بالإجابة",      sub:"تحدي العطاء والمشاركة",     pts:20 },
  { id:"c11", icon:"🔍", title:"ابحث عن فرصة عمل مناسبة",            sub:"تحدي السوق والاستكشاف",     pts:15 },
  { id:"c12", icon:"📊", title:"حلّل نتائج أسبوعك — ماذا أنجزت؟",     sub:"تحدي التحليل والمتابعة",    pts:20 },
  { id:"c13", icon:"🎯", title:"ضع هدفاً SMART لهذا الشهر",           sub:"تحدي التخطيط الذكي",        pts:25 },
  { id:"c14", icon:"💡", title:"شارك فكرة مبتكرة في المجتمع",         sub:"تحدي الإبداع والمشاركة",    pts:20 },
  { id:"c15", icon:"📸", title:"وثّق إنجازاً صغيراً بصورة أو نص",    sub:"تحدي التوثيق والاعتزاز",    pts:15 },
  { id:"c16", icon:"🌱", title:"تعلّم مصطلحاً جديداً في مجالك",       sub:"تحدي التوسع المعرفي",       pts:10 },
  { id:"c17", icon:"⏰", title:"طبّق تقنية Pomodoro 25 دقيقة",        sub:"تحدي الإنتاجية والتركيز",   pts:15 },
  { id:"c18", icon:"🗣️", title:"اشرح مفهوماً تعلمته لشخص آخر",       sub:"تحدي التعليم بالشرح",       pts:20 },
  { id:"c19", icon:"📬", title:"راسل خبيراً في مجالك",                sub:"تحدي الجرأة والتواصل",      pts:25 },
  { id:"c20", icon:"🏅", title:"أنهِ وحدة أو درساً كاملاً",           sub:"تحدي الإتمام والمثابرة",    pts:30 },
  { id:"c21", icon:"🔔", title:"فعّل تنبيهات تعلم يومي",              sub:"تحدي الانتظام",             pts:10 },
  { id:"c22", icon:"🎶", title:"استمع لبودكاست في مجالك",             sub:"تحدي التعلم بالاستماع",     pts:10 },
  { id:"c23", icon:"💬", title:"اعلّق بفكرة بنّاءة على منشور",        sub:"تحدي التفاعل الإيجابي",     pts:15 },
  { id:"c24", icon:"🗂️", title:"نظّم ملفاتك ومشاريعك",               sub:"تحدي الترتيب والتنظيم",     pts:15 },
  { id:"c25", icon:"🚀", title:"ابدأ مشروعاً جانبياً صغيراً",         sub:"تحدي الانطلاق الجرئ",       pts:30 },
  { id:"c26", icon:"🔧", title:"أصلح خطأً في مشروع قديم",             sub:"تحدي المراجعة والتحسين",    pts:20 },
  { id:"c27", icon:"📖", title:"اقرأ فصلاً من كتاب متخصص",            sub:"تحدي القراءة العميقة",      pts:15 },
  { id:"c28", icon:"🌍", title:"استكشف منصة عمل حر جديدة",            sub:"تحدي توسيع آفاق الدخل",     pts:20 },
  { id:"c29", icon:"🎁", title:"شارك مورداً مفيداً مع الأصدقاء",      sub:"تحدي الكرم المعرفي",        pts:15 },
  { id:"c30", icon:"🏠", title:"اضبط بيئة عملك المثالية",             sub:"تحدي الإعداد والانطلاق",    pts:15 },
];


/* =============================================
   CAREER CATEGORIES — تجميع المسارات في فئات
   ============================================= */
const CAREER_CATEGORIES = [
  {
    id: "tech",
    name: "البرمجة والتقنية",
    nameEn: "Programming & Tech",
    icon: "💻",
    color: "#4f35e8",
    colorLight: "rgba(79,53,232,0.1)",
    desc: "من مواقع الويب إلى الذكاء الاصطناعي — عالم التقنية بانتظارك",
    longDesc: "فئة البرمجة والتقنية هي بوابة عالم التكنولوجيا الرقمية. بتشمل كل المهن اللي بتتعامل مع الكمبيوتر والإنترنت والأنظمة الذكية — من بناء المواقع والتطبيقات، لتحليل البيانات الضخمة، لحماية الأنظمة من الهجمات، لبناء نماذج الذكاء الاصطناعي. الطلب على متخصصيها عالمي ومستمر، والرواتب فيها من الأعلى في السوق. مناسبة لكل شخص بيحب المنطق وحل المشكلات وبناء أشياء من الصفر.",
    catKeys: ["تقني"],
  },
  {
    id: "design",
    name: "التصميم والإبداع",
    nameEn: "Design & Creativity",
    icon: "🎨",
    color: "#e8502a",
    colorLight: "rgba(232,80,42,0.1)",
    desc: "حوّل إبداعك إلى مهنة مربحة في عالم التصميم",
    longDesc: "فئة التصميم والإبداع هي عالم الشخص اللي بيفكر بالألوان والأشكال والجمال. بتشمل مهن زي تصميم الجرافيك والهويات البصرية، وتصميم واجهات المواقع والتطبيقات (UI/UX)، والتصوير الفوتوغرافي، والموشن جرافيك والمونتاج. لو عندك حاسة جمالية وبتحب إنك تعبّر عن نفسك بصرياً — الفئة دي هي مكانك. الإبداع هنا مش هواية، هو مصدر دخل حقيقي ومربح.",
    catKeys: ["إبداعي"],
  },
  {
    id: "business",
    name: "الأعمال والريادة",
    nameEn: "Business & Entrepreneurship",
    icon: "📈",
    color: "#0d8a5f",
    colorLight: "rgba(13,138,95,0.1)",
    desc: "قود الأعمال وابنِ مستقبلك التجاري من الصفر",
    longDesc: "فئة الأعمال والريادة هي للشخص اللي بيفكر بالاستراتيجيات والأرقام وبناء المشاريع. بتشمل مهن زي التسويق الرقمي، وإدارة المشاريع، والتجارة الإلكترونية، والفريلانس، والمبيعات، والتحليل المالي. مناسبة لكل شخص عنده طموح تجاري أو عايز يبني مشروعه الخاص أو يتولى قيادة فرق وإدارة أعمال بشكل احترافي.",
    catKeys: ["أعمال"],
  },
  {
    id: "content",
    name: "المحتوى والتواصل",
    nameEn: "Content & Communication",
    icon: "🎬",
    color: "#e8a81a",
    colorLight: "rgba(232,168,26,0.1)",
    desc: "اصنع محتوى يُغيّر حياة الناس ويبني جمهوراً",
    longDesc: "فئة المحتوى والتواصل هي للشخص اللي بيحب الكلام والكتابة والتعبير عن أفكاره. بتشمل مهن زي كتابة المحتوى، وإنشاء محتوى يوتيوب، وإدارة السوشيال ميديا، والترجمة، والكتابة الإبداعية، والبودكاست، والتعليق الصوتي. لو بتحب تأثر في الناس وتوصل رسالتك بطرق متنوعة — هنا مكانك الصح.",
    catKeys: ["تواصل"],
  },
  {
    id: "practical",
    name: "المهارات العملية",
    nameEn: "Practical Skills",
    icon: "🔧",
    color: "#7c6dff",
    colorLight: "rgba(124,109,255,0.1)",
    desc: "حرف وتخصصات عملية ذات طلب لا ينقطع",
    longDesc: "فئة المهارات العملية هي للشخص اللي بيحب الشغل اليدوي والمهني الملموس. بتشمل مهن زي الطبخ والتدريب عليه، والتدريب الرياضي، والمكياج والتجميل، والنجارة والديكور، والكهرباء والطاقة الشمسية. المهن دي عليها طلب دائم ومستمر، وممكن تبني منها مشروع خاص بيك أو تشتغل فريلانس بحرية تامة.",
    catKeys: ["عملي"],
  },
  {
    id: "academic",
    name: "الأكاديمي والبحثي",
    nameEn: "Academic & Research",
    icon: "🎓",
    color: "#3d8ef5",
    colorLight: "rgba(61,142,245,0.1)",
    desc: "مسارات علمية وأكاديمية للباحثين والمتخصصين",
    longDesc: "فئة الأكاديمي والبحثي هي للشخص اللي بيحب التعمق في المعرفة والبحث والتحليل. بتشمل مهن زي التدريس والتعليم أونلاين، والبحث العلمي، والقانون، والطب البديل والعلاج الطبيعي. مناسبة لكل شخص بيقدر يصبر على التعلم العميق وبيستمتع بإنه يفهم الأشياء من جذورها ويساهم في نشر المعرفة.",
    catKeys: ["أكاديمي"],
  },
  {
    id: "languages",
    name: "اللغات والترجمة",
    nameEn: "Languages & Translation",
    icon: "🌍",
    color: "#0f7a9a",
    colorLight: "rgba(15,122,154,0.1)",
    desc: "إتقان اللغات يفتح أبواب العالم أمامك",
    longDesc: "فئة اللغات والترجمة هي للشخص اللي بيحب التواصل عبر الثقافات ويعشق تعلم لغات جديدة. بتشمل مهن زي الترجمة المكتوبة والشفهية، وتعليم اللغات، والتدقيق اللغوي، ومترجم لغة الإشارة. إتقان لغة ثانية أو ثالثة بيضاعف فرصك المهنية ويفتح لك أسواق جديدة حول العالم. الطلب على المترجمين المتخصصين في تزايد مستمر.",
    catKeys: ["لغات"],
  },
  {
    id: "lifeskills",
    name: "المهارات الحياتية",
    nameEn: "Life Skills",
    icon: "🧠",
    color: "#7a1fa8",
    colorLight: "rgba(122,31,168,0.1)",
    desc: "مهارات تبني شخصيتك وتضاعف نجاحك في كل المجالات",
    longDesc: "فئة المهارات الحياتية هي الأساس اللي بيقوم عليه النجاح في أي مجال. بتشمل مهارات زي إدارة الوقت، والتواصل الفعّال، والذكاء العاطفي، والقيادة، والتفكير النقدي، والوعي المالي. هذه المهارات مش بتُكسب في الجامعة — بتُبنى بالتدريب المتعمد والوعي الذاتي. من يتقنها بيتفوق على أقرانه في أي مسار اختاره.",
    catKeys: ["حياتية"],
  },
];

/* =============================================
   DATA ACCESS API — unified interface
   Merges CAREERS_DATA + PLATFORM_DATA into one
   ============================================= */

/** Get all tracks (flat) — reads from CAREERS_DATA.tracks */
function getAllTracks() {
  const out = [];
  CAREERS_DATA.forEach(c => { if (c.tracks) c.tracks.forEach(t => out.push(t)); });
  return out;
}

/** Find a track by its ID */
function getTrackById(trackId) {
  for (const c of CAREERS_DATA) {
    if (!c.tracks) continue;
    const t = c.tracks.find(tr => tr.id === trackId);
    if (t) return t;
  }
  return null;
}

/** Get all tracks for a career */
function getTracksForCareer(careerId) {
  const c = CAREERS_DATA.find(x => x.id === careerId);
  return c?.tracks || [];
}

/** Get a course within a track */
function getCourseById(trackId, courseId) {
  const t = getTrackById(trackId);
  return t ? (t.courses.find(c => c.id === courseId) || null) : null;
}

/** Get careers for a UI category */
function getCareersForCategory(categoryId) {
  const cat = CAREER_CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return [];
  return CAREERS_DATA.filter(c => cat.catKeys.includes(c.cat));
}
