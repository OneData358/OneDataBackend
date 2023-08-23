const axios = require('axios');
const cheerio = require('cheerio');

async function fetchResearchPapers(profileUrl) {
  try {
    const response = await axios.get(profileUrl);
    const $ = cheerio.load(response.data);

    const papers = [];

    $('.gsc_a_tr').each((index, element) => {
      const title = $(element).find('.gsc_a_t a').text();
      const authors = $(element).find('.gs_gray').text();
      const publication = $(element).find('.gsc_a_pp').text();
      const citedBy = $(element).find('.gsc_a_ac').text();

      papers.push({
        title,
        authors,
        publication,
        citedBy,
      });
    });

    return papers;
  } catch (error) {
    console.error('Error fetching research papers:', error);
    return [];
  }
}

// const profileUrl = 'https://scholar.google.com/citations?user=lUCod98AAAAJ';
// const profileUrl = 'teacher url here';
fetchResearchPapers(profileUrl)
  .then((papers) => {
    console.log('Fetched research papers:', papers);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
  module.exports=fetchResearchPapers;
//   sample response
//   [
//     {
//       title: 'General cardiovascular risk profile for use in primary care: the Framingham Heart Study',
//       authors: 'RB D’Agostino Sr, RS Vasan, MJ Pencina, PA Wolf, M Cobain, ...Circulation 117 (6), 743-753, 2008',
//       publication: '',
//       citedBy: '7678'
//     },
//     {
//       title: 'Evaluating the added predictive ability of a new marker: from area under the ROC curve to reclassification and beyond',
//       authors: "MJ Pencina, RB D'Agostino Sr, RB D'Agostino Jr, RS VasanStatistics in medicine 27 (2), 157-172, 2008",
//       publication: '',
//       citedBy: '6197'
//     },
//     {
//       title: 'Obesity and the risk of heart failure',
//       authors: 'S Kenchaiah, JC Evans, D Levy, PWF Wilson, EJ Benjamin, MG Larson, ...New England Journal of Medicine 347 (5), 305-313, 2002',
//       publication: '',
//       citedBy: '3652'
//     },
//     {
//       title: 'Vitamin D deficiency and risk of cardiovascular disease',
//       authors: 'TJ Wang, MJ Pencina, SL Booth, PF Jacques, E Ingelsson, K Lanier, ...Circulation 117 (4), 503-511, 2008',
//       publication: '',
//       citedBy: '3408'
//     },
//     {
//       title: 'Abdominal visceral and subcutaneous adipose tissue compartments: association with metabolic risk factors in the Framingham Heart Study',
//       authors: 'CS Fox, JM Massaro, U Hoffmann, KM Pou, P Maurovich-Horvat, CY Liu, ...Circulation 116 (1), 39-48, 2007',
//       publication: '',
//       citedBy: '3236'
//     },
//     {
//       title: 'Impact of high-normal blood pressure on the risk of cardiovascular disease',
//       authors: "RS Vasan, MG Larson, EP Leip, JC Evans, CJ O'Donnell, WB Kannel, ...New England journal of medicine 345 (18), 1291-1297, 2001",
//       publication: '',
//       citedBy: '3062'
//     },
//     {
//       title: 'Metabolite profiles and the risk of developing diabetes',
//       authors: 'TJ Wang, MG Larson, RS Vasan, S Cheng, EP Rhee, E McCabe, ...Nature medicine 17 (4), 448-453, 2011',
//       publication: '',
//       citedBy: '2988'
//     },
//     {
//       title: 'The progression from hypertension to congestive heart failure',
//       authors: 'D Levy, MG Larson, RS Vasan, WB Kannel, KKL HoJama 275 (20), 1557-1562, 1996',
//       publication: '',
//       citedBy: '2921'
//     },
//     {
//       title: 'Long-term trends in the incidence of and survival with heart failure',
//       authors: 'D Levy, S Kenchaiah, MG Larson, EJ Benjamin, MJ Kupka, KKL Ho, ...New England Journal of Medicine 347 (18), 1397-1402, 2002',
//       publication: '',
//       citedBy: '2914'
//     },
//     {
//       title: 'Lifetime risk for development of atrial fibrillation: the Framingham Heart Study',
//       authors: 'DM Lloyd-Jones, TJ Wang, EP Leip, MG Larson, D Levy, RS Vasan, ...Circulation 110 (9), 1042-1046, 2004',
//       publication: '',
//       citedBy: '2865'
//     },
//     {
//       title: 'Arterial stiffness and cardiovascular events: the Framingham Heart Study',
//       authors: 'GF Mitchell, SJ Hwang, RS Vasan, MG Larson, MJ Pencina, NM Hamburg, ...Circulation 121 (4), 505-511, 2010',
//       publication: '',
//       citedBy: '2511'
//     },
//     {
//       title: 'Residual lifetime risk for developing hypertension in middle-aged women and men: The Framingham Heart Study',
//       authors: "RS Vasan, A Beiser, S Seshadri, MG Larson, WB Kannel, RB D'Agostino, ...Jama 287 (8), 1003-1010, 2002",
//       publication: '',
//       citedBy: '2385'
//     },
//     {
//       title: 'Temporal relations of atrial fibrillation and congestive heart failure and their joint influence on mortality: the Framingham Heart Study',
//       authors: 'TJ Wang, MG Larson, D Levy, RS Vasan, EP Leip, PA Wolf, ...Circulation 107 (23), 2920-2925, 2003',
//       publication: '',
//       citedBy: '2295'
//     },
//     {
//       title: 'Genetic variants in novel pathways influence blood pressure and cardiovascular disease risk',
//       authors: 'CKDGen Consortium, KidneyGen Consortium, EchoGen consortium, ...Nature 478 (7367), 103-109, 2011',
//       publication: '',
//       citedBy: '2183'
//     },
//     {
//       title: 'Lifetime risk for developing congestive heart failure: the Framingham Heart Study',
//       authors: 'DM Lloyd-Jones, MG Larson, EP Leip, A Beiser, RB D’agostino, ...Circulation 106 (24), 3068-3072, 2002',
//       publication: '',
//       citedBy: '2119'
//     },
//     {
//       title: 'Changes in arterial stiffness and wave reflection with advancing age in healthy men and women: the Framingham Heart Study',
//       authors: 'GF Mitchell, H Parise, EJ Benjamin, MG Larson, MJ Keyes, JA Vita, ...Hypertension 43 (6), 1239-1245, 2004',
//       publication: '',
//       citedBy: '1870'
//     },
//     {
//       title: 'Plasma natriuretic peptide levels and the risk of cardiovascular events and death',
//       authors: 'TJ Wang, MG Larson, D Levy, EJ Benjamin, EP Leip, T Omland, PA Wolf, ...New England Journal of Medicine 350 (7), 655-663, 2004',
//       publication: '',
//       citedBy: '1870'
//     },
//     {
//       title: 'Congestive heart failure in subjects with normal versus reduced left ventricular ejection fraction: prevalence and mortality in a population-based cohort',
//       authors: 'RS Vasan, MG Larson, ScD, EJ Benjamin, JC Evans, CK Reiss, D LevyJournal of the American College of Cardiology 33 (7), 1948-1955, 1999',
//       publication: '',
//       citedBy: '1829'
//     },
//     {
//       title: 'Aortic pulse wave velocity improves cardiovascular event prediction: an individual participant meta-analysis of prospective observational data from 17,635 subjects',
//       authors: 'Y Ben-Shlomo, M Spears, C Boustred, M May, SG Anderson, EJ Benjamin, ...Journal of the American College of Cardiology 63 (7), 636-646, 2014',
//       publication: '',
//       citedBy: '1795'
//     },
//     {
//       title: 'Common genetic determinants of vitamin D insufficiency: a genome-wide association study',   
//       authors: 'TJ Wang, F Zhang, JB Richards, B Kestenbaum, JB Van Meurs, D Berry, ...The Lancet 376 (9736), 180-188, 2010',
//       publication: '',
//       citedBy: '1780'
//     }
//   ]