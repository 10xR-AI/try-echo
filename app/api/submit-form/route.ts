// app/api/submit-form/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Initialize Google Auth
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Initialize Google Sheets API
const sheets = google.sheets('v4');

export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const body = await req.json();
    const { 
      name, 
      email, 
      countryCode, 
      phoneNumber, 
      useCase, 
      timeline,
      audienceSize,
      rating,
      feedback, 
      submittedAt
    } = body;

    // Combine country code and phone number
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    // Get the spreadsheet ID from environment variables
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    if (!spreadsheetId) {
      throw new Error('Google Sheet ID is not configured');
    }

    // Map the useCase value to its label for better readability in sheets
    const useCaseMap: { [key: string]: string } = {
      'corporate-training': 'Corporate Training & Development',
      'higher-education': 'Higher Education',
      'k12-education': 'K-12 Education',
      'compliance-training': 'Compliance Training',
      'professional-development': 'Professional Development',
      'customer-education': 'Customer Education & Onboarding'
    };

    // Map the timeline value to its label
    const timelineMap: { [key: string]: string } = {
      'immediate': 'As soon as possible (within 1 week)',
      'soon': 'Within 2-4 weeks',
      'quarter': 'This quarter (within 3 months)',
      'year': 'This year',
      'exploring': 'Just exploring options'
    };

    // Map the audience size to its label
    const audienceSizeMap: { [key: string]: string } = {
      '1-50': '1-50 learners',
      '51-200': '51-200 learners',
      '201-1000': '201-1,000 learners',
      '1001-5000': '1,001-5,000 learners',
      '5000+': '5,000+ learners'
    };

    // Format date for better readability in sheets
    const formattedDate = new Date(submittedAt).toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Append data to the Google Sheet
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      // Specify the range where data should be inserted (updated to include new fields)
      range: 'Sheet1!A:K',
      // How the input data should be interpreted
      valueInputOption: 'USER_ENTERED',
      // The new values to append
      requestBody: {
        values: [[
          name,                           // Column A: Name
          email,                          // Column B: Email
          fullPhoneNumber,                // Column C: Phone Number
          useCaseMap[useCase] || useCase, // Column D: Use Case (mapped to label)
          timelineMap[timeline] || timeline, // Column E: Timeline (mapped to label)
          audienceSizeMap[audienceSize] || audienceSize, // Column F: Audience Size
          rating || 0,                    // Column G: Rating
          feedback || '',                 // Column H: Feedback
          formattedDate,                  // Column I: Submission Timestamp
          'New',                          // Column J: Status (default to New)
          'RequestAccessForm'             // Column K: Form Source
        ]],
      },
    });

    // Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Form submitted successfully'
    });

  } catch (error) {
    // Log the error for debugging
    console.error('Error submitting form:', error);

    // Return error response
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to submit form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}