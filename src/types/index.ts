export type ContentStatus = 'draft' | 'review' | 'approved' | 'published' | 'archived';

export interface ExecutiveMember {
  id: string;
  name: string;
  designation: string;
  wing: 'Executive Leadership' | 'Operations' | 'Marketing & Communications' | 'Talent & Welfare' | 'Events & Engagement' | 'Advisory';
  order: number;
  photoUrl: string;
  bio: string;
  linkedin?: string;
  email?: string;
  term: string;
  isLeadership: boolean;
  status: 'active' | 'alumni';
}

export type NoticeCategory = 
  | 'General'
  | 'Recruitment'
  | 'Competition'
  | 'Seminar'
  | 'Workshop'
  | 'Opportunity'
  | 'Internal Announcement';

export interface Notice {
  id: string;
  slug: string;
  title: string;
  category: NoticeCategory;
  summary: string;
  content: string;
  isPinned: boolean;
  publishDate: string;
  deadline?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  registrationUrl?: string;
  status: ContentStatus;
  author: string;
  seoTitle?: string;
  seoDescription?: string;
}

export type EventCategory = 
  | 'Intra-university'
  | 'Inter-university'
  | 'Finance Competition'
  | 'Case Competition'
  | 'Seminar'
  | 'Workshop'
  | 'Guest Session'
  | 'Networking'
  | 'Collaboration';

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  coverImage: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  organizers: string;
  partners?: string[];
  registrationUrl?: string;
  registrationDeadline?: string;
  isPast: boolean;
  highlights: string[];
  galleryImages?: string[];
  postEventReport?: string;
  status: ContentStatus;
  seoTitle?: string;
  seoDescription?: string;
}

export type PartnerCategory = 
  | 'Corporate'
  | 'University Club'
  | 'Academic'
  | 'Institutional'
  | 'Event'
  | 'Media';

export interface CollaborationItem {
  id: string;
  name: string;
  category: PartnerCategory;
  logoUrl: string;
  description: string;
  collaborationScope: string;
  website?: string;
  featured: boolean;
  year: string;
  status: ContentStatus;
}

export type OpportunityCategory = 
  | 'Internships'
  | 'Jobs'
  | 'Competitions'
  | 'Case competitions'
  | 'Scholarships'
  | 'Certifications'
  | 'Training programs'
  | 'Professional development';

export type OpportunityStatus = 'OPEN' | 'CLOSING SOON' | 'CLOSED';

export interface OpportunityItem {
  id: string;
  slug: string;
  title: string;
  organization: string;
  category: OpportunityCategory;
  description: string;
  eligibility: string;
  location: string;
  deadline: string;
  publishDate: string;
  applicationUrl: string;
  status: OpportunityStatus;
  compensation?: string;
  workflowStatus: ContentStatus;
  seoTitle?: string;
  seoDescription?: string;
}

export type AchievementCategory = 
  | 'Internship Achievements'
  | 'Job Placements'
  | 'Competition Winners'
  | 'Scholarships'
  | 'Academic Excellence'
  | 'Professional Certifications'
  | 'Research Publications'
  | 'Leadership Appointments'
  | 'Other Notable Achievements';

export interface MemberAchievement {
  id: string;
  slug: string;
  memberName: string;
  photoUrl: string;
  achievementTitle: string;
  category: AchievementCategory;
  organizationOrCompetition: string;
  date: string;
  year: string;
  congratulatoryMessage: string;
  supportingImage?: string;
  details?: string;
  status: ContentStatus;
  seoTitle?: string;
  seoDescription?: string;
}

export type JournalCategory = 
  | 'Financial Literacy'
  | 'Investment'
  | 'Banking'
  | 'Corporate Finance'
  | 'Fintech'
  | 'Economics'
  | 'Entrepreneurship'
  | 'Business Strategy'
  | 'Bangladesh Financial Landscape';

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  coverImage: string;
  category: JournalCategory;
  publishDate: string;
  readTime: string;
  excerpt: string;
  content: string;
  references: string[];
  relatedSlugs: string[];
  status: ContentStatus;
  seoTitle?: string;
  seoDescription?: string;
}

export type ReportType = 
  | 'Annual Report'
  | 'Event Report'
  | 'Activity Report'
  | 'Research Publication'
  | 'Competition Report'
  | 'Special Publication';

export interface ReportItem {
  id: string;
  title: string;
  type: ReportType;
  year: string;
  publishDate: string;
  description: string;
  coverImage: string;
  fileUrl: string;
  fileSize: string;
  pageCount: number;
  status: ContentStatus;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Competitions' | 'Seminars' | 'Workshops' | 'Collaborations' | 'Guest Sessions' | 'Club Activities';
  imageUrl: string;
  caption: string;
  eventName: string;
  date: string;
  featured: boolean;
  status: ContentStatus;
}

export interface LeadershipMessage {
  name: string;
  title: string;
  role: string;
  photoUrl: string;
  quote: string;
  content: string[];
}

export interface RecruitmentStage {
  step: number;
  title: string;
  description: string;
  timeline: string;
}

export interface RecruitmentConfig {
  isOpen: boolean;
  cycleName: string;
  deadline: string;
  eligibleDepartments: string[];
  minimumCredits: string;
  applicationLink?: string;
  stages: RecruitmentStage[];
  faqs: { question: string; answer: string }[];
}

export interface RecruitmentApplication {
  id: string;
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  department: string;
  completedCredits: string;
  cgpa: string;
  preferredWing: string;
  whyJoin: string;
  previousExperience?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  status: 'Pending' | 'Interview Shortlisted' | 'Accepted' | 'Declined';
  submittedAt: string;
}

export interface WebsiteSettings {
  siteName: string;
  tagline: string;
  primaryMessage: string;
  supportingMessage: string;
  address: string;
  email: string;
  phone: string;
  advisorName: string;
  institution: string;
  facebookUrl: string;
  linkedinUrl: string;
  googleSiteVerification: string;
  bingSiteVerification: string;
  announcementBannerEnabled: boolean;
  announcementBannerText: string;
  announcementBannerLink: string;
  statEstablished: string;
  statExecutiveMembers: number;
  statCompetitions: number;
  statSeminars: number;
  statCollaborations: number;
  statAchievements: number;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
}

export interface AppStore {
  settings: WebsiteSettings;
  presidentMessage: LeadershipMessage;
  mentorMessage: LeadershipMessage;
  executives: ExecutiveMember[];
  notices: Notice[];
  events: EventItem[];
  collaborations: CollaborationItem[];
  opportunities: OpportunityItem[];
  achievements: MemberAchievement[];
  journal: JournalArticle[];
  reports: ReportItem[];
  gallery: GalleryItem[];
  recruitment: RecruitmentConfig;
  recruitmentApplications: RecruitmentApplication[];
  auditLogs: AuditLogItem[];
}

