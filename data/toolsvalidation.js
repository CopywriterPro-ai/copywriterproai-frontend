const singleValidation = (task, limit = true) => {
  let isLimit = limit;

  const validateSchema = {
    paraphrasing: {
      task: "paraphrasing",
      userText: { min: 5, max: isLimit ? 400 : 600, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    expander: {
      task: "expander",
      userText: { min: 5, max: isLimit ? 400 : 600, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    simplifier: {
      task: "simplifier",
      userText: { min: 5, max: isLimit ? 400 : 600, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    summarizer: {
      task: "summarizer",
      userText: { min: 5, max: isLimit ? 400 : 600, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    abstract: {
      task: "abstract",
      userText: { min: 5, max: isLimit ? 400 : 600, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    "notes-from-passage": {
      task: "notes-from-passage",
      userText: { min: 5, max: isLimit ? 400 : 600, required: true },
      numberOfPoints: { min: 2, max: 10, required: true },
    },
    "grammar-fixer": {
      task: "grammar-fixer",
      userText: { min: 5, max: isLimit ? 400 : 600, required: true },
    },
    proofread: {
      task: "proofread",
      userText: { min: 5, max: isLimit ? 600 : 1000, required: true },
    },
    "change-tone": {
      task: "change-tone",
      userText: { min: 5, max: isLimit ? 400 : 600, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
      tone: [
        "Formal",
        "Friendly",
        "Neutral",
        "Confident",
        "Curious",
        "Surprised",
        "Happy",
        "Angry",
        "Sad",
        "Concerned",
        "Encouraging",
        "Regretful",
        "Optimistic",
        "Excited",
        "Witty",
        "Persuasive",
        "Empathetic",
      ],
    },
    "active-passive": {
      task: "active-passive",
      userText: { min: 5, max: 200, required: true },
      from: ["Active", "Passive"],
      to: ["Passive", "Active"],
    },
    "point-of-view": {
      task: "point-of-view",
      userText: { min: 5, max: 200, required: true },
      from: ["first-person", "second-person", "third-person"],
      to: ["first-person", "second-person", "third-person"],
      gender: ["male", "female"],
    },
    "blog-idea": {
      task: "blog-idea",
      productName: { min: 3, max: 50, required: true },
      productDescription: { min: 10, max: 300, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    "blog-headline": {
      task: "blog-headline",
      about: { min: 10, max: 200, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    "blog-intro": {
      task: "blog-intro",
      about: { min: 10, max: 200, required: true },
      headline: { min: 10, max: 150, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    "blog-outline": {
      task: "blog-outline",
      numberOfPoints: { min: 3, max: 10, required: true },
      about: { min: 10, max: 200, required: true },
      headline: { min: 10, max: 150, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    "blog-topic": {
      task: "blog-topic",
      about: { min: 10, max: 200, required: true },
      headline: { min: 10, max: 150, required: true },
      userText: { min: 10, max: 200, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    "blog-outro": {
      task: "blog-outro",
      about: { min: 10, max: 200, required: true },
      headline: { min: 10, max: 150, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    "product-description": {
      task: "product-description",
      productName: { min: 3, max: 50, required: true },
      productType: { min: 5, max: 100, required: true },
    },
    "seo-friendly-product-description": {
      task: "seo-friendly-product-description",
      productName: { min: 3, max: 50, required: true },
      productType: { min: 5, max: 100, required: true },
      productFeatures: { min: 10, max: isLimit ? 150 : 250, required: true },
      productBenefits: { min: 10, max: isLimit ? 150 : 250, required: true },
      targetAudience: { min: 3, max: 50, required: true },
    },
    "product-review": {
      task: "product-review",
      product: { min: 3, max: 50, required: true },
      comment: { min: 10, max: 150, required: true },
    },
    "catchy-headline": {
      task: "catchy-headline",
      content: { min: 5, max: 200, required: true },
    },
    "attention-grabbing-headline": {
      task: "attention-grabbing-headline",
      content: { min: 5, max: 200, required: true },
    },
    "newspaper-headline": {
      task: "newspaper-headline",
      content: { min: 5, max: 200, required: true },
    },
    "resume-headline": {
      task: "resume-headline",
      profession: { min: 5, max: 50, required: true },
    },
    "campaign-facebook-post": {
      task: "campaign-facebook-post",
      platformType: { min: 5, max: 100, required: true },
    },
    "twitter-campaign-post": {
      task: "twitter-campaign-post",
      platformType: { min: 5, max: 100, required: true },
    },
    "ads-facebook-primary-texts": {
      task: "ads-facebook-primary-texts",
      companyName: { min: 3, max: 50, required: true },
      businessType: { min: 5, max: 100, required: true },
      benefits: { min: 10, max: 200, required: true },
    },
    "ads-facebook-headlines": {
      task: "ads-facebook-headlines",
      productName: { min: 3, max: 50, required: true },
      businessType: { min: 5, max: 100, required: true },
      customerBenefit: { min: 10, max: 200, required: true },
    },
    "ads-facebook-link-descriptions": {
      task: "ads-facebook-link-descriptions",
      companyName: { min: 3, max: 50, required: true },
      platformType: { min: 3, max: 100, required: true },
    },
    "facebook-ads-from-product-description": {
      task: "facebook-ads-from-product-description",
      product: { min: 10, max: 200, required: true },
    },
    "instagram-ad-texts": {
      task: "instagram-ad-texts",
      platformType: { min: 5, max: 100, required: true },
      context: { min: 10, max: 200, required: true },
    },
    "linkedin-ad-texts": {
      task: "linkedin-ad-texts",
      companyName: { min: 3, max: 50, required: true },
      businessType: { min: 5, max: 100, required: true },
      benefits: { min: 10, max: 200, required: true },
    },
    "ads-google-headlines": {
      task: "ads-google-headlines",
      name: { min: 3, max: 50, required: true },
      businessType: { min: 5, max: 100, required: true },
    },
    "ads-google-descriptions": {
      task: "ads-google-descriptions",
      businessName: { min: 3, max: 50, required: true },
      productCategories: { min: 5, max: isLimit ? 100 : 150, required: true },
      uniqueness: { min: 10, max: isLimit ? 100 : 200, required: true },
      promotions: { min: 5, max: 50, required: true },
      keywords: { min: 3, max: isLimit ? 100 : 150, required: true },
    },
    "youtube-video-titles-from-description": {
      task: "youtube-video-titles-from-description",
      description: { min: 10, max: 300, required: true },
    },
    "youtube-video-ideas": {
      task: "youtube-video-ideas",
      topic: { min: 5, max: 200, required: true },
    },
    "image-idea-from-ad-text": {
      task: "image-idea-from-ad-text",
      product: { min: 5, max: 100, required: true },
      adText: { min: 10, max: 200, required: true },
    },
    "email-marketing-campaign-subject": {
      task: "email-marketing-campaign-subject",
      productDescription: { min: 10, max: 300, required: true },
    },
    "email-marketing-campaign-body": {
      task: "email-marketing-campaign-body",
      productDescription: { min: 10, max: 200, required: true },
      about: { min: 10, max: 150, required: true },
      subjectLine: { min: 5, max: 60, required: true },
    },
    "email-body": {
      task: "email-body",
      about: { min: 10, max: 150, required: true },
      to: { min: 5, max: 30, required: true },
    },
    "email-subject-from-body": {
      task: "email-subject-from-body",
      emailBody: { min: 10, max: isLimit ? 400 : 600, required: true },
    },
    "website-short-description": {
      task: "website-short-description",
      industryType: { min: 5, max: 100, required: true },
      businessName: { min: 3, max: 50, required: true },
    },
    "website-keywords-from-text": {
      task: "website-keywords-from-text",
      primaryText: { min: 10, max: isLimit ? 400 : 600, required: true },
    },
    "youtube-video-tags-from-description": {
      task: "youtube-video-tags-from-description",
      primaryText: { min: 10, max: isLimit ? 400 : 600, required: true },
    },
    "youtube-channel-tags-from-description": {
      task: "youtube-channel-tags-from-description",
      primaryText: { min: 10, max: isLimit ? 400 : 600, required: true },
    },
    "website-seo-friendly-blog-ideas": {
      task: "website-seo-friendly-blog-ideas",
      content: { min: 5, max: 100, required: true },
      desiredOutcome: { min: 5, max: 100, required: true },
      industry: { min: 5, max: 50, required: true },
      targetAudience: { min: 3, max: 50, required: true },
    },
    "website-landing-page-headline": {
      task: "website-landing-page-headline",
      businessType: { min: 5, max: 100, required: true },
    },
    "product-name": {
      task: "product-name",
      productDescription: { min: 10, max: 200, required: true },
      keywords: { min: 3, max: 100, required: true },
    },
    "linkedin-summary": {
      task: "linkedin-summary",
      profession: { min: 5, max: 50, required: true },
      skills: { min: 5, max: 100, required: true },
    },
    "catchy-business-taglines": {
      task: "catchy-business-taglines",
      companyName: { min: 3, max: 50, required: true },
      businessType: { min: 5, max: 100, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    "fiverr-profile-description": {
      task: "fiverr-profile-description",
      profession: { min: 5, max: 100, required: true },
      experience: { min: 5, max: 20, required: true },
      numberOfSuggestions: { min: 1, max: 10, required: true },
    },
    "fiverr-categories-headline": {
      task: "fiverr-categories-headline",
    },
    "cv-summary": {
      task: "cv-summary",
      yourJobTitle: { min: 3, max: 50, required: true },
      keyAchievements: { min: 10, max: 150, required: true },
      yearsOfExperience: { min: 1, max: 2, required: true },
    },
    "problem-agitate-solution": {
      task: "problem-agitate-solution",
      productName: { min: 3, max: 50, required: true },
      productDescription: { min: 10, max: 300, required: true },
    },
    "problem-agitate-solution-outcome": {
      task: "problem-agitate-solution-outcome",
      productName: { min: 3, max: 50, required: true },
      productDescription: { min: 10, max: 300, required: true },
    },
    "attention-interest-desire-action": {
      task: "attention-interest-desire-action",
      productName: { min: 3, max: 50, required: true },
      productDescription: { min: 10, max: 300, required: true },
    },
    "amazon-product-listings": {
      task: "amazon-product-listings",
      productName: { min: 3, max: 50, required: true },
      productCategories: { min: 5, max: 50, required: true },
      productFeatures: { min: 10, max: 250, required: true },
    },
    "generate-recipe": {
      task: "generate-recipe",
    },
  };

  return validateSchema[task] ? validateSchema[task] : {};
};

export default singleValidation;
