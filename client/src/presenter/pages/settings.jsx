import SettingsBlock from "../features/settings/settingsBlock";
import Header from "../layout/header";
import StatsNavMenu from "../layout/statsNavMenu";

function SettingsPage() {
  return (
    <div>
      <Header />
      <section id="settings">
        <StatsNavMenu />
        <SettingsBlock /> 
      </section>
    </div>
  );
}

export default SettingsPage;
