class OtpsController < ApplicationController
  def index; end

  def generate
    email = params[:email].presence
    return render json: { message: 'Please provide an Email' }, status: :unprocessable_entity unless email

    otp_with_encrypted_hash = ::OTPManagement::GenerateOTPWithEncryptedHash.call(email: params[:email])
    otp = otp_with_encrypted_hash[:otp]
    encrypted_hash = otp_with_encrypted_hash[:encrypted_hash]
    # OTPMailer.notify(email: email, otp: otp).deliver_now

    render json: { email: email, encrypted_hash: encrypted_hash }
  end

  def verify
    email = params[:email]
    otp = params[:otp].presence
    encrypted_hash = params[:encrypted_hash]
    return render json: { message: "Please provide the OTP sent to #{email}" }, status: :unprocessable_entity unless otp

    verification_status_with_message = OTPManagement::VerifyOTPUsingEncryptedHash.call(
      email: email,
      otp: otp,
      encrypted_hash: encrypted_hash,
    )

    status = verification_status_with_message[:status]
    message = verification_status_with_message[:message]

    if status == :success
      render json: { message: message }
    else
      render json: { message: message }, status: :unprocessable_entity
    end
  end
end
