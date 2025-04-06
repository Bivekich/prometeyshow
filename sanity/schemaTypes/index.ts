import { type SchemaTypeDefinition } from 'sanity';
import post from './post';
import author from './author';
import category from './category';
import contact from './contact';
import workingCity from './workingCity';
import faq from './faq';
import blogPost from './blogPost';
import blogCategory from './blogCategory';
import galleryPhoto from './galleryPhoto';
import galleryVideo from './galleryVideo';
import portfolioItem from './portfolioItem';
import service from './service';
import specialOffer from './specialOffer';
import priceListItem from './priceListItem';
import achievement from './achievement';
import aboutStats from './aboutStats';
import aboutGallery from './aboutGallery';
import teamMember from './teamMember';
import review from './review';
import historyEvent from './historyEvent';
import videoBanner from './videoBanner';
import companyIntro from './companyIntro';
import homeStats from './homeStats';
import upcomingEvent from './upcomingEvent';
import mainPageService from './mainPageService';
import mainPageSections from './mainPageSections';
import pageHeaders from './pageHeaders';
import documentFile from './documentFile';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    category,
    contact,
    workingCity,
    faq,
    blogPost,
    blogCategory,
    galleryPhoto,
    galleryVideo,
    portfolioItem,
    service,
    specialOffer,
    priceListItem,
    achievement,
    aboutStats,
    aboutGallery,
    teamMember,
    review,
    historyEvent,
    videoBanner,
    companyIntro,
    homeStats,
    upcomingEvent,
    mainPageService,
    mainPageSections,
    pageHeaders,
    documentFile,
  ],
};
