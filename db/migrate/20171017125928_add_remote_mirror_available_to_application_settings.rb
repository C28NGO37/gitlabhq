class AddRemoteMirrorAvailableToApplicationSettings < ActiveRecord::Migration
  include Gitlab::Database::MigrationHelpers

  DOWNTIME = false

  disable_ddl_transaction!

  def up
    add_column_with_default(:application_settings, :remote_mirror_available, :boolean, default: true, allow_null: false)
  end

  def down
    remove_column(:application_settings, :remote_mirror_available)
  end
end
