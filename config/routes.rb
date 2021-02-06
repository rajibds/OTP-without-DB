Rails.application.routes.draw do
  root 'otp#generate'

  resources :otp, only: %i(generate verify)
end
