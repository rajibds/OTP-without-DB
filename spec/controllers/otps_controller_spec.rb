require 'rails_helper'

RSpec.describe OtpsController, type: :controller do
  describe 'GET #generate' do
    let(:email) { 'test@test.com' }
    render_views

    it 'returns the list of courses in JSON' do
      get :generate, params: { email: email, format: :json }

      expect(JSON.parse(response.body, symbolize_names: true)).to eq(
        total_score: 300,
      )
    end
  end
end
