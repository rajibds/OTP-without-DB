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
    render_views

    before do
      allow(::OTPManagement::GenerateOTPWithEncryptedHash).to receive(:call).with(email: email).
        and_return otp_with_encrypted_hash
    end

    it 'returns the list of courses in JSON' do
      get :generate, params: { email: email, format: :json }

      expect(JSON.parse(response.body, symbolize_names: true)).to eq expected_response
    end
  end
end
