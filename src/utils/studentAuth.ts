/**
 * Student Authentication & Darood Shareef blessings data
 */

export interface StudentSession {
  name: string;
  vuId: string;
  isLoggedIn: boolean;
  loginTime: string;
}

export const DAROOD_SHAREEF = {
  title: 'درود ابراہیمی — Durood-e-Ibrahimi',
  arabic:
    'اَللّٰھُمَّ صَلِّ عَلٰی مُحَمَّدٍ وَّعَلٰی اٰلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلٰى اِبْرَاھِيْمَ وَعَلٰى اٰلِ اِبْرَاھِيْمَ اِنَّكَ حَمِيْدٌ مَّجِيْدٌ ، اَللّٰھُمَّ بَارِكْ عَلٰی مُحَمَّدٍ وَّعَلٰی اٰلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلٰى اِبْرَاھِيْمَ وَعَلٰى اٰلِ اِبْرَاھِيْمَ اِنَّكَ حَمِيْدٌ مَّجِيْدٌ',
  urdu: 'اے اللہ! رحمتیں نازل فرما حضرت محمد ﷺ پر اور ان کی آل پر، جس طرح تو نے رحمتیں نازل فرمائیں حضرت ابراہیمؑ پر اور ان کی آل پر، بیشک تو تعریف کے لائق بڑی بزرگی والا ہے۔ اے اللہ! برکتیں نازل فرما حضرت محمد ﷺ پر اور ان کی آل پر، جس طرح تو نے برکتیں نازل فرمائیں حضرت ابراہیمؑ پر اور ان کی آل پر، بیشک تو تعریف کے لائق بڑی بزرگی والا ہے۔',
  english:
    'O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy and Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious.',
  fazilat:
    'علم حاصل کرنے سے پہلے درود شریف پڑھنا فہم و حافظہ میں برکت، ذہنی یکسوئی اور امتحان میں آسانی کا باعث بنتا ہے۔',
};

/**
 * Validates student login credentials
 */
export function validateStudentCredentials(
  name: string,
  vuId: string,
  pass: string
): { isValid: boolean; error?: string } {
  const cleanName = name.trim();
  const cleanVuId = vuId.trim().toUpperCase();
  const cleanPass = pass.trim();

  if (!cleanName || cleanName.length < 2) {
    return { isValid: false, error: 'Please enter your full name (at least 2 characters).' };
  }

  if (!cleanVuId) {
    return { isValid: false, error: 'Please enter your Virtual University Student ID (e.g. BC210401234).' };
  }

  // Check VU ID pattern (e.g. BC/MC/BS/MS followed by digits)
  const vuIdRegex = /^[A-Z]{2,4}\d{4,10}$/i;
  if (!vuIdRegex.test(cleanVuId)) {
    return {
      isValid: false,
      error: 'Invalid VU ID format. Expected format like BC210401234 or MC200204567.',
    };
  }

  if (!cleanPass || cleanPass.length < 4) {
    return { isValid: false, error: 'Password must be at least 4 characters long.' };
  }

  return { isValid: true };
}
