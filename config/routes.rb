Rails.application.routes.draw do
  root "mainpages#welcome"
  
  resources :students do
    member do
      get :me
    end
  end
  resources :teachers
  devise_for :users, controllers: { registrations: "registrations", sessions: "sessions" }

  resources :books
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
