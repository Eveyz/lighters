Rails.application.routes.draw do
  root "mainpages#welcome"

  get 'admin/dashboard', to: 'admin#dashboard'
  
  namespace :admin do
    resources :users do
      member do
        get :index
      end
    end
  end

  resources :courses do
    member do
      get :add_student
      post :enroll_student
      delete :drop_student
    end
  end
  resources :reports
  
  resources :students do
    member do
      get :me
    end
    collection do
      get :search_student
    end
  end
  
  resources :teachers do
    member do
      get :me
      get :pending
    end
  end

  devise_for :users, controllers: { registrations: "registrations", sessions: "sessions" }

  resources :books
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
