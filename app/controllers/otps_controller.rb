class OtpsController < ApplicationController
  def index; end

  def generate
    email = params[:email].presence
    return render json: { message: 'Please provide an Email' }, status: :unprocessable_entity unless email

    encrypted_hash = ::OTPManagement::GenerateOTPWithEncryptedHash.call(email: params[:email])
    render json: { email: email, encrypted_hash: encrypted_hash }
  end

  def verify
    verification_status_with_message = OTPManagement::VerifyOTPUsingEncryptedHash.call(
      email: params[:email],
      otp: params[:otp],
      encrypted_hash: params[:encrypted_hash],
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
