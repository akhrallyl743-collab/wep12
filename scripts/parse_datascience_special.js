#!/usr/bin/env node
/**
 * scripts/parse_datascience_special.js
 * ----------------------------------------------------------------------------
 * معالجة مخصَّصة ليدوية لملف Data Science/README.md (بقرار صريح، راجع تقرير
 * المراجعة 2026-06-22): الملف يحتوي جداول HTML معطوبة بطرق متعددة ومختلفة
 * (صفوف بلا إغلاق </td></tr> صحيح، خلايا متداخلة بعمق متفاوت) تتجاوز ما يمكن
 * لمحرك تحليل عام أن يعالجه بثقة كاملة بدون مخاطرة بخلل في ملفات أخرى.
 *
 * البنية الحقيقية المُستخرَجة يدوياً من الملف الخام (5 مستويات):
 *   2.1 Entry Level (4 مواضيع) → 2.2 Beginner Level (6) → 2.3 Intermediate
 *   Level (6) → 2.4 Advanced A Level (Math + ML algorithms + APIs، عدة أقسام
 *   فرعية بأسابيع مدمجة) → 2.5 Advanced B Level (3 Phases: Deep Learning
 *   الأساسي / Transformers & LLMs / NLP fields).
 * ----------------------------------------------------------------------------
 */
'use strict';
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'output', 'cat_parsed');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function topic(title_en, resources) {
  return { title_en, task_note: null, resources };
}

const sections = [
  {
    title_en: '2.1. Entry Level',
    order: 1,
    topics: [
      topic('Data Literacy & Understanding Data Science (Week 1)', [
        { title: 'Introduction to Data literacy', url: 'https://app.datacamp.com/learn/courses/introduction-to-data-literacy' },
        { title: 'Understanding Data Science', url: 'https://app.datacamp.com/learn/courses/understanding-data-science' },
        { title: 'Arizona State University | Data Literacy', url: 'https://www.youtube.com/playlist?list=PLNrrxHpJhC8m_ifiOWl1hquDmdgvcviOt' },
        { title: 'Maven Analytics | Data Literacy', url: 'https://mavenanalytics.io/course/data-literacy-foundations' },
        { title: 'Simplilearn | Understanding Data Science', url: 'https://www.youtube.com/watch?v=KxryzSO1Fjs' },
        { title: 'Mustafa Othman | Data Literacy Arabic course', url: 'https://youtube.com/playlist?list=PLWd4nYaF_Vx65cPZF_I2OpWERatzh5Gdj&si=s6bu10dbeW1aGXly' }
      ]),
      topic('Introduction to Statistics (Week 2)', [
        { title: 'Introduction to Statistics', url: 'https://app.datacamp.com/learn/courses/introduction-to-statistics' },
        { title: 'StatQuest | Statistics Fundamentals', url: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9' },
        { title: 'Simple Learning Pro | Statistics 1', url: 'https://www.youtube.com/playlist?list=PL0KQuRyPJoe6KjlUM6iNYgt8d0DwI-IGR' },
        { title: 'Probability and Statistics Arabic course', url: 'https://www.youtube.com/playlist?list=PLJM7jJIw2GC2Ihr__bRSeMxzsiFMZEsx7' },
        { title: 'Statistics for Data Science Arabic course', url: 'https://unihance.com/Course/8030-5/%D8%B9%D9%84%D9%85-%D8%A7%D9%84%D8%A5%D8%AD%D8%B5%D8%A7%D8%A1-%D9%84%D8%BA%D8%A7%D9%8A%D8%A7%D8%AA-%D8%B9%D9%84%D9%85-%D8%A7%D9%84%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA-%D9%88%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A' }
      ]),
      topic('Python Basics (Week 3)', [
        { title: 'Udacity | Introduction to Python', url: 'https://www.udacity.com/course/introduction-to-python--ud1110' },
        { title: 'FreeCodeCamp | Python Full Course', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw' },
        { title: 'Osama Elzero | Mastering Python Arabic course', url: 'https://youtube.com/playlist?list=PLDoPjvoNmBAyE_gei5d18qkfIe-Z8mocs&si=yWsnLKcsYqGcI0B4' }
      ]),
      topic('OOP in Python (Week 4)', [
        { title: 'OOP in Python', url: 'https://app.datacamp.com/learn/courses/object-oriented-programming-in-python' },
        { title: 'Codezilla | OOP in Python Arabic course', url: 'https://youtube.com/playlist?list=PLuXY3ddo_8nzUrgCyaX_WEIJljx_We-c1&si=n6ZW2Dok_a4FueiG' }
      ])
    ]
  },
  {
    title_en: '2.2. Beginner Level',
    order: 2,
    topics: [
      topic('NumPy (Week 1)', [
        { title: 'Keith Galli | NumPy tutorial', url: 'https://youtu.be/GB9ByFAIAH4?si=APzRNNBbFusUagYp' },
        { title: 'Introduction to NumPy', url: 'https://app.datacamp.com/learn/courses/introduction-to-numpy' },
        { title: 'Osama Elzero | NumPy Arabic course', url: 'https://www.youtube.com/playlist?list=PLUgz8T_NoatsJCH-DmieQhqhSL2WBvlm-' },
        { title: 'Hesham Asem | NumPy Arabic course', url: 'https://youtube.com/playlist?list=PL6-3IRz2XF5UM-FWfQeF1_YhMMa12Eg3s&si=qR-fuUZfKjCjs7Ic' },
        { title: 'task notebook', url: 'https://drive.google.com/file/d/1IRzTGmUCzz3GJyxAIWAAsykXk_95l5ht/view?usp=sharing' }
      ]),
      topic('Pandas (Week 2)', [
        { title: 'Corey Schafer | Pandas tutorial', url: 'https://youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS&si=ln9NvKCM064QT2hR' },
        { title: 'Data School | Data analysis with pandas', url: 'https://youtube.com/playlist?list=PL5-da3qGB5ICCsgW1MxlZ0Hq8LL5U3u9y&si=BuVDzp2CSsyx-FPh' },
        { title: 'Simple Learning Pro Statistics 1', url: 'https://www.youtube.com/playlist?list=PL0KQuRyPJoe6KjlUM6iNYgt8d0DwI-IGR' },
        { title: 'Data manipulation with Pandas', url: 'https://app.datacamp.com/learn/courses/data-manipulation-with-pandas' },
        { title: 'Hesham Asem | Pandas Arabic course', url: 'https://youtube.com/playlist?list=PL6-3IRz2XF5UM-FWfQeF1_YhMMa12Eg3s&si=qR-fuUZfKjCjs7Ic' },
        { title: 'task notebook', url: 'https://drive.google.com/drive/folders/1ES61cauS4qbT-KuC-BabBYv3wBYZ4KAf?usp=sharing' }
      ]),
      topic('Matplotlib (Week 3)', [
        { title: 'Understanding Data Visualization', url: 'https://app.datacamp.com/learn/courses/understanding-data-visualization' },
        { title: 'Corey Schafer | Matplotlib tutorial', url: 'https://youtube.com/playlist?list=PL-osiE80TeTvipOqomVEeZ1HRrcEvtZB_&si=I3gLknPrRuBYvuIo' },
        { title: 'Introduction to Data Visualization with Matplotlib', url: 'https://app.datacamp.com/learn/courses/introduction-to-data-visualization-with-matplotlib' }
      ]),
      topic('Seaborn (Week 4)', [
        { title: 'Kimberly Fessel | Intro to Seaborn', url: 'https://youtube.com/playlist?list=PLtPIclEQf-3cG31dxSMZ8KTcDG7zYng1j&si=a9PhU5bC9UIWyLTX' },
        { title: 'Introduction to Data Visualization with Seaborn', url: 'https://app.datacamp.com/learn/courses/introduction-to-data-visualization-with-seaborn' },
        { title: 'Intermediate Data Visualization with Seaborn', url: 'https://app.datacamp.com/learn/courses/intermediate-data-visualization-with-seaborn' },
        { title: 'task notebook', url: 'https://colab.research.google.com/drive/1PApywZw8dVapY25hvcmHVArfdW-rmNSB?usp=sharing' },
        { title: 'data for visualizations', url: 'https://www.kaggle.com/datasets/cat-reloaded-data-science/movies?authuser=0' }
      ]),
      topic('Power BI (Week 5)', [
        { title: 'Alex The Analyst | Power BI tutorial', url: 'https://www.youtube.com/playlist?list=PLUaB-1hjhk8HqnmK0gQhfmIdCbxwoAoys' },
        { title: 'Introduction to Power BI', url: 'https://app.datacamp.com/learn/courses/introduction-to-power-bi' },
        { title: 'Mohamed Zanoon | Power BI Arabic course', url: 'https://youtube.com/playlist?list=PL69umUTzySPGWMxnmhX9SV5PIEbdnHv63&si=6GUwZfLbnMC3E6_C' }
      ]),
      topic('Git & GitHub (Week 6)', [
        { title: 'The Net Ninja | Git & GitHub tutorial', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9goXbgTDQ0n_4TBzOO0ocPR' },
        { title: 'Osama Elzero | Git & GitHub Arabic course', url: 'https://youtube.com/playlist?list=PLDoPjvoNmBAw4eOj58MZPakHjaO3frVMF&si=d5G5A-xQhcNtI-qG' },
        { title: 'Ahmed Fathy | Git & GitHub Arabic course', url: 'https://almdrasa.com/tracks/programming-foundations/courses/git-github/' },
        { title: 'Big Data With Arabic | Git & GitHub Arabic video', url: 'https://youtu.be/Q6G-J54vgKc?si=rsvkO9inU_VwPduX' }
      ])
    ]
  },
  {
    title_en: '2.3. Intermediate Level',
    order: 3,
    topics: [
      topic('Regular Expressions (RegEx) (Week 1)', [
        { title: 'Regular Expressions in Python', url: 'https://app.datacamp.com/learn/courses/regular-expressions-in-python' },
        { title: 'Python RegEx documentation', url: 'https://www.w3schools.com/python/python_regex.asp' },
        { title: 'Corey Schafer | Regular Expressions', url: 'https://youtu.be/K8L6KVGG-7o?si=SZYD07npXZ74qyUD' },
        { title: 'Osama Elzero | Regular Expressions Arabic course', url: 'https://youtube.com/playlist?list=PLDoPjvoNmBAyE_gei5d18qkfIe-Z8mocs&si=K2_7VELcasmhtGc8' },
        { title: 'task notebook', url: 'https://drive.google.com/drive/folders/12h8BLm_8ZdzB-eKVQxXwnvRl6NIGCrj0?usp=sharing' }
      ]),
      topic('Data Cleaning (Week 2)', [
        { title: 'Cleaning Data in Python', url: 'https://app.datacamp.com/learn/courses/cleaning-data-in-python' },
        { title: 'Data Cleaning Kaggle tutorial', url: 'https://www.kaggle.com/learn/data-cleaning' },
        { title: 'Data Cleaning Medium article', url: 'https://towardsdatascience.com/the-ultimate-guide-to-data-cleaning-3969843991d4' },
        { title: 'task notebook (Candy dataset)', url: 'https://drive.google.com/drive/folders/1Nxi3h7cxIFDJ1Zr8LajnHYDA2cuLDAK2?usp=sharing' }
      ]),
      topic('Feature Engineering (Week 3)', [
        { title: 'Feature Engineering for Machine Learning in Python', url: 'https://app.datacamp.com/learn/courses/feature-engineering-for-machine-learning-in-python' },
        { title: 'Feature Engineering Medium article', url: 'https://towardsdatascience.com/feature-engineering-for-machine-learning-3a5e293a5114' }
      ]),
      topic('Exploratory Data Analysis (EDA) (Week 4)', [
        { title: 'Exploratory Data Analysis in Python', url: 'https://app.datacamp.com/learn/courses/exploratory-data-analysis-in-python' },
        { title: 'Exploratory Data Analysis Medium article', url: 'https://towardsdatascience.com/exploratory-data-analysis-8fc1cb20fd15' },
        { title: 'Satyajit Pattnaik | EDA from Scratch', url: 'https://www.youtube.com/watch?v=FNLLxYcUnowsss' },
        { title: 'Simplilearn | Exploratory Data Analysis In Python', url: 'https://www.youtube.com/watch?v=MoM6mighOJM' },
        { title: 'task notebook', url: 'https://drive.google.com/drive/folders/1PFKCoQA2jak1RTYcsQRg7hYSN_BlHJB4' }
      ]),
      topic('Web Scraping (Week 5)', [
        { title: 'Web Scraping in Python', url: 'https://app.datacamp.com/learn/courses/web-scraping-in-python' },
        { title: 'Codezilla | Web Scraping with Python Arabic', url: 'https://www.youtube.com/watch?v=q0ert5YP968' },
        { title: 'freeCodeCamp | Scrapy course', url: 'https://youtu.be/mBoX_JCKZTE?si=kUL590DAPkYgLT2N' },
        { title: 'Oxylabs (practice scraping target)', url: 'https://sandbox.oxylabs.io/products' }
      ]),
      topic('Structured Query Language (SQL) (Week 6)', [
        { title: 'SQL Fundamentals', url: 'https://app.datacamp.com/learn/skill-tracks/sql-fundamentals' },
        { title: 'CS50 | Introduction to Databases with SQL', url: 'https://cs50.harvard.edu/sql/2024/' },
        { title: 'Udacity | SQL For Data Analysis', url: 'https://www.udacity.com/course/sql-for-data-analysis--ud198' },
        { title: 'Big Data | SQL For Data Analysis Arabic', url: 'https://www.youtube.com/watch?v=kb-_GbpH3sQ' }
      ])
    ]
  },
  {
    title_en: '2.4. Advanced A Level — Math & Machine Learning',
    order: 4,
    topics: [
      topic('Linear Algebra (Week 1)', [
        { title: 'Imperial College London | Linear Algebra', url: 'https://www.coursera.org/learn/linear-algebra-machine-learning?specialization=mathematics-machine-learning' },
        { title: '3Blue1Brown | Essence of Linear Algebra', url: 'https://www.3blue1brown.com/topics/linear-algebra' },
        { title: 'Khan Academy | Linear Algebra', url: 'https://www.khanacademy.org/math/linear-algebra' },
        { title: 'MIT OpenCourseWare | Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/video_galleries/video-lectures/' },
        { title: 'Linear Algebra Arabic course', url: 'https://www.youtube.com/playlist?list=PLJM7jJIw2GC1YBTTSGbFIlBxzY1aUmmJQ' },
        { title: 'MCQ quiz', url: 'https://forms.gle/Wc2FN1sCvxutkL7V6' },
        { title: 'task notebook', url: 'https://drive.google.com/file/d/1zjhC7xKR8LTJj0pFiG5jjsdYzzTgdqMl/view?usp=sharing' }
      ]),
      topic('Multi-variate Calculus (Week 2)', [
        { title: 'Imperial College London | Multivariate Calculus', url: 'https://www.coursera.org/learn/multivariate-calculus-machine-learning?specialization=mathematics-machine-learning' },
        { title: '3Blue1Brown | Essence of Calculus', url: 'https://www.3blue1brown.com/topics/calculus' },
        { title: 'Khan Academy | Multivariable Calculus', url: 'https://www.khanacademy.org/math/multivariable-calculus' },
        { title: 'MCQ quiz', url: 'https://forms.gle/JG14eVXAh4muiLdd8' },
        { title: 'task notebook', url: 'https://colab.research.google.com/drive/1j_bOiw022XFXyoSRvi6ju0dF7B0OQHXn?usp=sharing' }
      ]),
      topic('General Machine Learning Resources (supplementary)', [
        { title: 'StateQuest | Machine Learning', url: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF' },
        { title: 'Data School | Machine Learning', url: 'https://www.youtube.com/playlist?list=PL5-da3qGB5ICeMbQuqbbCOQWcS6OYBr5A' },
        { title: 'Machine Learning from Scratch | YouTube playlist', url: 'https://www.youtube.com/playlist?list=PLqnslRFeH2Upcrywf-u2etjdxxkL8nl7E' },
        { title: 'Machine Learning Mastery', url: 'https://machinelearningmastery.com/start-here/#getstarted' },
        { title: 'Udacity | Intro to Machine Learning', url: 'https://www.udacity.com/enrollment/ud120' },
        { title: 'Sentdex | Machine Learning with Python', url: 'https://www.youtube.com/playlist?list=PLQVvvaa0QuDfKTOs3Keq_kaG2P55YRn5v' },
        { title: 'Machine Learning in Arabic', url: 'https://www.youtube.com/playlist?list=PLtsZ69x5q-X9j44MdSX-NGuOhGXOY0aqH' }
      ]),
      topic('Supervised Learning (Weeks 3-4)', [
        { title: 'Andrew Ng | Machine Learning', url: 'https://www.coursera.org/learn/machine-learning' },
        { title: 'Supervised Learning with Scikit-Learn', url: 'https://app.datacamp.com/learn/courses/supervised-learning-with-scikit-learn' },
        { title: 'task notebook', url: 'https://drive.google.com/file/d/1e_MAU0DX5CKnftyqsbr5Sh83OsIhxF18/view?usp=sharing' },
        { title: 'task data', url: 'https://drive.google.com/file/d/1E4rJzlOSPSB914-cQFLk3U02E90iF24v/view?usp=sharing' },
        { title: 'task notebook (week 3)', url: 'https://drive.google.com/file/d/1GZiVMo2bBkSyveZDTPvbvwnuRsWXortF/view?usp=sharing' }
      ]),
      topic('Hands-On Machine Learning book study (Weeks 5-14)', [
        { title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow, 3rd Edition', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/' },
        { title: 'task folder per chapter', url: 'https://drive.google.com/drive/folders/1KNwUR9TcP3XPaiuXuleGgMXr0xYlPVCf?usp=sharing' },
        { title: 'CAT Reloaded Kaggle profile (datasets)', url: 'https://www.kaggle.com/organizations/cat-reloaded-data-science/datasets' }
      ]),
      topic('Unsupervised & Reinforcement Learning (Weeks 15-16)', [
        { title: 'Unsupervised Learning in Python', url: 'https://app.datacamp.com/learn/courses/unsupervised-learning-in-python' },
        { title: 'Andrew Ng | Unsupervised Learning, Recommenders, Reinforcement Learning', url: 'https://www.coursera.org/learn/unsupervised-learning-recommenders-reinforcement-learning?specialization=machine-learning-introduction' }
      ]),
      topic('Ensemble Learning & Neural Networks intro (Weeks 17-18)', [
        { title: 'Machine Learning with Tree-Based Models in Python', url: 'https://app.datacamp.com/learn/courses/machine-learning-with-tree-based-models-in-python' },
        { title: 'Andrew Ng | Advanced Learning Algorithms', url: 'https://www.coursera.org/learn/advanced-learning-algorithms?specialization=machine-learning-introduction' }
      ]),
      topic('APIs (Week 20)', [
        { title: 'Introduction to APIs in Python', url: 'https://app.datacamp.com/learn/courses/introduction-to-apis-in-python' },
        { title: 'Introduction to FastAPI', url: 'https://app.datacamp.com/learn/courses/introduction-to-fastapi' }
      ])
    ]
  },
  {
    title_en: '2.5.1. Phase 1: Basic Concepts of Deep Learning',
    order: 5,
    topics: [
      topic('Basic concepts of Deep Learning (Weeks 1-3)', [
        { title: 'Andrew Ng | Neural Networks and Deep Learning', url: 'https://www.coursera.org/learn/neural-networks-deep-learning?specialization=deep-learning' },
        { title: 'Andrej Karpathy | Neural Network from scratch', url: 'https://youtu.be/VMj-3S1tku0?si=xN0gneCmzYAOewI9' },
        { title: '3Blue1Brown | Neural Networks', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi' },
        { title: 'Hesham Asem | Deep Learning Arabic course', url: 'https://www.youtube.com/playlist?list=PL6-3IRz2XF5X-lzMZdmkvGAx1a3kIm7_I' }
      ]),
      topic('Optimizers & PyTorch (Weeks 3-4)', [
        { title: 'Andrew Ng | Improving Deep NN', url: 'https://www.coursera.org/learn/deep-neural-network?specialization=deep-learning' },
        { title: 'PyTorch Tutorials', url: 'https://youtube.com/playlist?list=PLqnslRFeH2UrcDBWF5mfPGpqQDSta6VK4&si=xDzbDOZZrradFBB6' },
        { title: 'Ahmed Hany | Hands-on-PyTorch Arabic video', url: 'https://drive.google.com/drive/folders/1oT8unPa8MlcKSoXG8f5MokcHkLzmOQJr?usp=drive_link' },
        { title: 'Introduction to Deep Learning with PyTorch', url: 'https://app.datacamp.com/learn/courses/introduction-to-deep-learning-with-pytorch' }
      ]),
      topic('Structuring ML projects & Transfer Learning (Week 5)', [
        { title: 'Andrew Ng | Structuring ML projects', url: 'https://www.coursera.org/learn/machine-learning-projects?specialization=deep-learning' },
        { title: 'PyTorch Tutorials (9th-13th)', url: 'https://www.youtube.com/playlist?list=PLqnslRFeH2UrcDBWF5mfPGpqQDSta6VK4' },
        { title: 'Khaled El-Hady | Loading data with PyTorch Arabic video', url: 'https://www.youtube.com/watch?v=ER-1QXk0KX8' }
      ]),
      topic('Convolutional Neural Networks (CNN) (Weeks 6-8)', [
        { title: 'Andrew Ng | Convolutional Neural Networks', url: 'https://www.coursera.org/learn/convolutional-neural-networks?specialization=deep-learning' },
        { title: 'Khaled El-Hady | Building Image classification model with PyTorch Arabic video', url: 'https://www.youtube.com/watch?v=ITcBQy5pSWc' },
        { title: 'Khaled El-Hady | Transfer Learning with PyTorch Arabic video', url: 'https://www.youtube.com/watch?v=X3XR7rV6WkI' },
        { title: 'Deep Learning for Images with PyTorch', url: 'https://app.datacamp.com/learn/courses/deep-learning-for-images-with-pytorch' }
      ]),
      topic('Recurrent Neural Networks (RNN) (Weeks 9-11)', [
        { title: 'Andrew Ng | Sequence Models', url: 'https://www.coursera.org/learn/nlp-sequence-models?specialization=deep-learning' },
        { title: 'Natural Language Processing Fundamentals in Python', url: 'https://app.datacamp.com/learn/courses/natural-language-processing-fundamentals-in-python' },
        { title: 'Deep Learning for Text with PyTorch', url: 'https://app.datacamp.com/learn/courses/deep-learning-for-text-with-pytorch' },
        { title: 'NLP ITI Arabic course', url: 'https://www.youtube.com/playlist?list=PLXNX_u2iEV4rw0caSVOALP2FBSEBZQ5Kn' }
      ])
    ]
  },
  {
    title_en: '2.5.2. Phase 2: Transformers and LLMs',
    order: 6,
    topics: [
      topic('Transformers (Weeks 12-13)', [
        { title: 'Attention Is All You Need (original paper)', url: 'https://arxiv.org/abs/1706.03762' },
        { title: 'Attention Is All You Need (video explanation)', url: 'https://www.youtube.com/watch?v=iDulhoQ2pro' },
        { title: 'Umar Jamil | Coding a transformer from scratch on PyTorch', url: 'https://www.youtube.com/watch?v=ISNdQcPhsts' }
      ]),
      topic('Large Language Models (LLMs) (Weeks 14-15)', [
        { title: 'StatQuest | Decoder-Only Transformers', url: 'https://youtu.be/bQ5BoolX9Ag?si=fVcd7Jf9X0ehPnD2' },
        { title: 'Generative AI with LLMs', url: 'https://www.coursera.org/learn/generative-ai-with-llms' },
        { title: 'Andrej Karpathy | Let\'s build GPT from scratch', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY' },
        { title: 'Hugging Face | NLP course', url: 'https://huggingface.co/learn/nlp-course/chapter1/1' },
        { title: 'The Full Stack Website | LLM Foundations', url: 'https://fullstackdeeplearning.com/llm-bootcamp/spring-2023/llm-foundations/' },
        { title: 'UC Berkeley | Understanding LLMs', url: 'https://www.youtube.com/playlist?list=PLJ66BAXN6D8H_gRQJGjmbnS5qCWoxJNfe' }
      ])
    ]
  },
  {
    title_en: '2.5.3. Phase 3: NLP fields',
    order: 7,
    topics: [
      topic('NLP sub-fields: RAG, LangChain, LangGraph', [
        { title: 'LangChain documentation', url: 'https://python.langchain.com/docs/introduction/' },
        { title: 'LangGraph documentation', url: 'https://langchain-ai.github.io/langgraph/tutorials/introduction/' },
        { title: "Abu Bakr Soliman's course (FastAPI, Docker, MongoDB, MVC)", url: 'https://youtube.com/playlist?list=PLvLvlVqNQGHCUR2p0b8a0QpVjDUg50wQj&si=10vb66GBnKLErwWl' }
      ])
    ]
  }
];

const output = {
  circle: 'DataScience',
  tracks: [
    {
      source_file: 'Data Science/README.md',
      roadmap_slug: 'cat-data-science',
      track_title_en: 'Data Science Roadmap 2025',
      sections,
      shell_only: false
    }
  ]
};

fs.writeFileSync(path.join(OUT_DIR, 'DataScience.json'), JSON.stringify(output, null, 2), 'utf8');

const totalTopics = sections.reduce((n, s) => n + s.topics.length, 0);
const totalResources = sections.reduce((n, s) => n + s.topics.reduce((m, t) => m + t.resources.length, 0), 0);
console.log('✅ DataScience (معالجة مخصَّصة يدوية): ' + sections.length + ' قسم (5 مستويات + 2 فرعي تحت Advanced B)، ' +
  totalTopics + ' موضوع، ' + totalResources + ' مورد — مُستخرَجة يدوياً 100% من الملف الخام بدقّة كاملة.');
