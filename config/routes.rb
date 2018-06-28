Rails.application.routes.draw do
  root "mainpages#welcome"

  resources :teachers
  devise_for :users, controllers: { registrations: "registrations" }

  resources :books
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
