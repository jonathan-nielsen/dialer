defmodule DialerWeb.Router do
  use DialerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", DialerWeb do
    pipe_through :browser # Use the default browser stack

    resources "/events", EventController

    get "/", PageController, :index
    resources "/user", UserController, only: [:index, :show]
    get "/login", LoginController, :index
  end

  scope "/api", DialerWeb do
    pipe_through :api

    resources "/user", UserController, only: [:index, :show]

    scope "/admin", DialerWeb do
      pipe_through [:auth, :ensure_admin, :api]

      resources "/posts", UserController
    end
  end
end
