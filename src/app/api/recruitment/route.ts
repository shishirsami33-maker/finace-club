import { NextResponse } from 'next/server';
import { getStore, updateStore } from '@/lib/storage';
import { RecruitmentApplication } from '@/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      studentId,
      email,
      phone,
      department,
      completedCredits,
      cgpa,
      preferredWing,
      whyJoin,
      previousExperience,
      linkedinUrl,
      portfolioUrl,
    } = body;

    if (!fullName || !studentId || !email || !phone || !department || !whyJoin) {
      return NextResponse.json(
        { error: 'Please fill in all mandatory application fields.' },
        { status: 400 }
      );
    }

    const store = getStore();
    const newApplication: RecruitmentApplication = {
      id: `app-${Date.now()}`,
      fullName,
      studentId,
      email,
      phone,
      department,
      completedCredits: completedCredits || '15+',
      cgpa: cgpa || 'N/A',
      preferredWing: preferredWing || 'General Membership',
      whyJoin,
      previousExperience,
      linkedinUrl,
      portfolioUrl,
      status: 'Pending',
      submittedAt: new Date().toISOString(),
    };

    const updatedApplications = [newApplication, ...(store.recruitmentApplications || [])];
    updateStore(
      'recruitmentApplications',
      updatedApplications,
      fullName,
      `New recruitment application received for ${preferredWing}`
    );

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully! Check your email for further instructions.',
      applicationId: newApplication.id,
    });
  } catch (err) {
    console.error('Recruitment submission error:', err);
    return NextResponse.json(
      { error: 'Failed to record application. Please try again or reach out to the club.' },
      { status: 500 }
    );
  }
}

