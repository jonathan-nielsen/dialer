# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :dialer,
  ecto_repos: [Dialer.Repo]

# Configures the endpoint
config :dialer, DialerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "28Watguno2Qq8HL9RhpCv7tMVv1BJZMcV1Jy+7VvJDPy3/zARr0XoUlRKAah0hoy",
  render_errors: [view: DialerWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Dialer.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
