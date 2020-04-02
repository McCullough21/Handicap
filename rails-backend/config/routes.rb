Rails.application.routes.draw do
  resources :scores
  resources :courses
  resources :users
#  post "users", to: "users#create"
  get "users/:username/:password", to: "users#show" 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
