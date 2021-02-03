Rails.application.routes.draw do
  root 'otp#index'

  resources :otp, only: :index
end
