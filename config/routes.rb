Rails.application.routes.draw do
  resources :answers
  resources :questions
  resources :posts
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
  get '/authorized_user', to: 'sessions#get_current_user'
  post '/rails/active_storage/direct_uploads' ,to: 'direct_uploads#create'
  # Defines the root path route ("/")
  # root "articles#index"
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
