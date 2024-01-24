import { StaticImageData } from 'next/image';

export interface IStrapiResponse {
	data: {
		[key: string]: unknown;
		attributes: {
			[key: string]: unknown;
			data: unknown;
		};
	};
	meta: {
		[key: string]: unknown;
	};
	error: {
		[key: string]: unknown;
	};
}
export interface ICategory {
	title: string;
	description: string;
	icon: JSX.Element;
	iconClass: string;
}

export interface IForClient {
	title: string;
	link: {
		label: string;
		path: string;
	};
}
export interface IStat {
    stat: string;
    description: string;
    icon?: JSX.Element;
}
export interface IDataIcon {
  title: string;
  description: string;
  icon: JSX.Element;
}
export interface ITestimonial{
    logo: StaticImageData | string;
  testimonial: string;
  classColor:string;
    user: {
        fullName: string;
        position: string;
        image:StaticImageData | string;
    };
}

export interface IUserTypeIconData {
    title: string;
    icon: JSX.Element;
  value:string
}

export interface UserTypeNewsLetter {
  email: string
  userType:'job-creator'|'provider'|'both',
}
export interface ISocial {
  icon: JSX.Element;
  link: string;
}
export interface ITeam {
  fullName: string;
  position: string;
  image: string | StaticImageData;
  socialLinks: ISocial[];
}
export interface ITeamData {
  title: string;
  description: string;
  link: {
      label: string;
      path: string;
  };
  team: ITeam[]
}

export interface IFAQ  {
  question: string;
  answer: string;
}
export interface IBlog  {
  latest:BlogArticle[],
  articles:BlogArticle[]
}
export interface IBlogCategory {
  category: string;
  articles: BlogArticle[];
}
export interface BlogArticle {
  title:string;
  description:string;
  body:string;
  category?:string;
  image:string | StaticImageData
  date:string | Date
  author?:{
    fullname:string
    image:string | StaticImageData
  }
}
