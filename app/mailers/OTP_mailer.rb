class OTPMailer < ApplicationMailer
  def notify(email:, otp:)
    @otp = otp

    mail(to: email, subject: t('layouts.mailer.otp_mailer.subject'))
  end
end
