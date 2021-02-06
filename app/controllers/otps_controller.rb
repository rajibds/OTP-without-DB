class OtpsController < ApplicationController
  def generate
    otp_with_encrypted_hash = OTPWithoutDB::GenerateOTPWithEncryptedHash.call(email: params[:email])
    @otp = otp_with_encrypted_hash[:otp]
    @encrypted_hash = otp_with_encrypted_hash[:encrypted_hash]
  end

  def verify
    verification_status_with_message = OTPWithoutDB::VerifyOTPUsingEncryptedHash.call(
      email: params[:email],
      otp: params[:otp],
      encrypted_hash: params[:encrypted_hash],
    )

    @status = verification_status_with_message[:status]
    @message = verification_status_with_message[:message]
  end
end
