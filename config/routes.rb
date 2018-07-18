Rails.application.routes.draw do
  root "mainpages#welcome"

  get 'admin/dashboard', to: 'admin#dashboard'
  get 'reports/new/hide-path-for-rails', to: 'reports#new'
  
  namespace :admin do
    resources :users do
      member do
        get :index
      end
    end
  end

  resources :courses do
    member do
      get :get_students
      get :add_student
      post :enroll_student
      delete :drop_student
      get :get_books
      get :add_books
      post :append_book
      delete :remove_book
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
      get :activate
      get :deactivate
      get :course_manage
      get :student_reports
    end
  end

  devise_for :users, controllers: { registrations: "registrations", sessions: "sessions" }

  resources :books
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
