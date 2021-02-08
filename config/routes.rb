Rails.application.routes.draw do
  root 'otps#index'

  resources :otps, only: :index do
    collection do
      get :generate
      get :verify
    end
  end
end
