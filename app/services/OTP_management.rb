module OTPManagement
  def self.encrypted_hash(email:, otp:, expiry_time:)
    key = Rails.application.secret_key_base
    data = "#{email}#{otp}#{expiry_time}"
    digest = OpenSSL::Digest.new('sha256')
    encrypted_hash = OpenSSL::HMAC.hexdigest(digest, key, data)

    "#{encrypted_hash}.#{expiry_time}"
  end

  class GenerateOTPWithEncryptedHash
    DEFAULT_EXPIRY_TIME = Time.now.utc + 30.minutes

    def self.call(email:, expiry_time: DEFAULT_EXPIRY_TIME)
      new(email, expiry_time).call
    end

    def initialize(email, expiry_time)
      @email = email
      @expiry_time = expiry_time
    end

    def call
      OTPManagement.encrypted_hash(
        email: @email,
        otp: otp,
        expiry_time: @expiry_time,
      )
    end

    def otp
      @otp ||= rand(10_000..99_999)
    end
  end

  class VerifyOTPUsingEncryptedHash
    def self.call(email:, otp:, encrypted_hash:)
      new(email, otp, encrypted_hash).call
    end

    def initialize(email, otp, encrypted_hash)
      @email = email
      @otp = otp
      @encrypted_hash = encrypted_hash
    end

    def call
      encrypted_hash_from_request, expiry_time_from_request = @encrypted_hash.split('.')
      return response(:failure, 'OTP expired') if expiry_time_from_request > Time.now.utc

      new_encrypted_hash = OTPManagement.encrypted_hash(
        email: @email,
        otp: @otp,
        expiry_time: expiry_time_from_request,
      )

      if new_encrypted_hash == encrypted_hash_from_request
        response(:success, 'OTP verification successful')
      else
        response(:failure, 'OTP verification unsuccessful')
      end
    end

    def response(status, message)
      {
        status: status,
        message: message,
      }
    end
  end
end
