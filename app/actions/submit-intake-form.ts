"use server"

import { resend } from "@/lib/resend"

interface IntakeFormData {
  name: string
  email: string
  company: string
  phone: string
  projectType: string[]
  budget: string
  timeline: string
  description: string
}

export async function submitIntakeForm(formData: IntakeFormData) {
  try {
    console.log("Starting form submission for:", formData.email)

    // Validate required fields
    if (!formData.name || !formData.email || !formData.description || formData.projectType.length === 0) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      }
    }

    // Send email to BearifiedCo team - this is the most important one
    console.log("Attempting to send team notification email...")

    const { data: teamData, error: teamError } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["alex@alexalaniz.com"],
      subject: `New Project Inquiry from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea; border-bottom: 2px solid #9333ea; padding-bottom: 10px;">
            New Project Inquiry - BearifiedCo™
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Company:</strong> ${formData.company || "Not provided"}</p>
            <p><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Project Details</h3>
            <p><strong>Services Needed:</strong> ${formData.projectType.join(", ")}</p>
            <p><strong>Budget Range:</strong> ${formData.budget || "Not specified"}</p>
            <p><strong>Timeline:</strong> ${formData.timeline || "Not specified"}</p>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Project Description</h3>
            <p style="white-space: pre-wrap;">${formData.description}</p>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #9333ea; color: white; border-radius: 8px; text-align: center;">
            <p style="margin: 0;">
              <strong>Reply to this email or contact ${formData.name} directly at ${formData.email}</strong>
            </p>
          </div>
        </div>
      `,
    })

    console.log("Team email data:", teamData)

    if (teamError) {
      console.error("Team email error details:", teamError)
      return {
        success: false,
        message: `Failed to send notification: ${teamError.message}`,
      }
    }

    // Only send client confirmation email if it's to your verified email
    // This prevents the 403 error for unverified domains
    const shouldSendClientEmail = formData.email === "alex@alexalaniz.com"

    if (shouldSendClientEmail) {
      console.log("Attempting to send client confirmation email...")

      const { data: clientData, error: clientError } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [formData.email],
        subject: "Thank you for your project inquiry - BearifiedCo™",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #9333ea, #7c3aed); color: white; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 300;">BearifiedCo™</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Where innovation meets execution</p>
            </div>
            
            <div style="padding: 40px 20px; background: white; border-radius: 0 0 8px 8px;">
              <h2 style="color: #333; margin-top: 0;">Hi ${formData.name},</h2>
              
              <p style="color: #666; line-height: 1.6;">
                Thank you for reaching out to BearifiedCo™! We've received your project inquiry and are excited to learn more about your vision.
              </p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #9333ea;">
                <h3 style="margin-top: 0; color: #333;">What happens next?</h3>
                <ul style="color: #666; line-height: 1.6;">
                  <li>Our team will review your project details within 24 hours</li>
                  <li>We'll reach out to schedule a discovery call</li>
                  <li>Together, we'll explore how we can bring your vision to life</li>
                </ul>
              </div>

              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Your Inquiry Summary</h3>
                <p><strong>Services:</strong> ${formData.projectType.join(", ")}</p>
                <p><strong>Timeline:</strong> ${formData.timeline || "To be discussed"}</p>
                <p><strong>Budget:</strong> ${formData.budget || "To be discussed"}</p>
              </div>

              <p style="color: #666; line-height: 1.6;">
                In the meantime, feel free to explore our work at 
                <a href="https://www.bearified.xyz" style="color: #9333ea; text-decoration: none;">bearified.xyz</a> 
                or reach out directly if you have any questions.
              </p>
              
              <div style="margin-top: 30px; padding: 20px; background: #9333ea; color: white; border-radius: 8px; text-align: center;">
                <p style="margin: 0;">
                  <strong>Questions? Reply to this email or visit bearified.xyz</strong>
                </p>
              </div>
            </div>
          </div>
        `,
      })

      if (clientError) {
        console.error("Client email error:", clientError)
        // Don't fail the whole process - team notification is more important
      } else {
        console.log("Client confirmation email sent successfully")
      }
    } else {
      console.log("Skipping client email - domain not verified. Client email:", formData.email)
    }

    console.log("Form submission completed successfully")
    return {
      success: true,
      message: "Form submitted successfully! We'll be in touch within 24 hours.",
    }
  } catch (error) {
    console.error("Form submission error:", error)

    if (error instanceof Error) {
      return {
        success: false,
        message: `Submission failed: ${error.message}`,
      }
    }

    return {
      success: false,
      message:
        "There was an unexpected error submitting your form. Please try again or contact us directly at hello@bearified.xyz",
    }
  }
}
