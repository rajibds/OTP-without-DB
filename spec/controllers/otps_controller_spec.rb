require 'rails_helper'

RSpec.describe OtpsController, type: :controller do
  describe 'GET #generate' do
    let(:email) { 'test@test.com' }
    let(:encrypted_hash) { 'abcxyz' }
    let(:otp_with_encrypted_hash) do
      {
        otp: 12_345,
        encrypted_hash: encrypted_hash,
      }
    end
    let(:expected_response) do
      {
        email: email,
        encrypted_hash: encrypted_hash,
      }
    end

    before do
      allow(::OTPManagement::GenerateOTPWithEncryptedHash).to receive(:call).with(email: email).
        and_return otp_with_encrypted_hash
    end

    it 'returns a json of email and encrypted hash' do
      get :generate, params: { email: email, format: :json }

      expect(JSON.parse(response.body, symbolize_names: true)).to eq expected_response
    end
  end

  describe 'GET #verify' do
    let(:email) { 'test@test.com' }
    let(:otp) { '123456' }
    let(:encrypted_hash) { 'abcxyz' }
    let(:verification_status_with_message) do
      {
        status: status,
        message: message,
      }
    end

    before do
      allow(::OTPManagement::VerifyOTPUsingEncryptedHash).to receive(:call).
        with(email: email, otp: otp, encrypted_hash: encrypted_hash).and_return verification_status_with_message
    end

    context 'successful verification' do
      let(:status) { :success }
      let(:message) { 'OTP Verification Successful' }

      it 'returns the verification message as response' do
        get :verify, params: { email: email, otp: otp, encrypted_hash: encrypted_hash, format: :json }
        expect(JSON.parse(response.body, symbolize_names: true)).to eq({ message: message })
      end
    end

    context 'unsuccessful verification' do
      let(:status) { :unprocessable_entity }
      let(:message) { 'OTP Verification Unsuccessful' }

      it 'returns the verification message as response' do
        get :verify, params: { email: email, otp: otp, encrypted_hash: encrypted_hash, format: :json }
        expect(response.status).to eq 422
        expect(JSON.parse(response.body, symbolize_names: true)).to eq({ message: message })
      end
    end
  end
end
