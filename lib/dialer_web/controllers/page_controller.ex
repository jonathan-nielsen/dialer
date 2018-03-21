defmodule DialerWeb.PageController do
  use DialerWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
