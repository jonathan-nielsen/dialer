defmodule DialerWeb.UserController do
	use DialerWeb, :controller

	def index(conn, _params) do
		render conn, "index.html"
	end

	def show(conn, %{"id" => id}) do
		render conn, "user.html", id: id
	end
end