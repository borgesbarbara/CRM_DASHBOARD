import { useState } from 'react'
import { Save, User, Bell, Shield } from 'lucide-react'

export default function Configuracoes() {
  const [settings, setSettings] = useState({
    empresa: {
      nome: 'Minha Empresa',
      email: 'contato@empresa.com',
      telefone: '(11) 99999-9999',
      endereco: 'Rua das Flores, 123 - São Paulo, SP'
    },
    notificacoes: {
      emailVendas: true,
      emailClientes: true,
      emailRelatorios: false,
      pushNotifications: true
    },
    sistema: {
      tema: 'claro',
      idioma: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      backupAutomatico: true
    }
  })

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    console.log('Configurações salvas:', settings)
    alert('Configurações salvas com sucesso!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gerencie as configurações do sistema
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Empresa */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Informações da Empresa</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
                <input
                  type="text"
                  value={settings.empresa.nome}
                  onChange={(e) => setSettings({
                    ...settings,
                    empresa: { ...settings.empresa, nome: e.target.value }
                  })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={settings.empresa.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    empresa: { ...settings.empresa, email: e.target.value }
                  })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <input
                  type="tel"
                  value={settings.empresa.telefone}
                  onChange={(e) => setSettings({
                    ...settings,
                    empresa: { ...settings.empresa, telefone: e.target.value }
                  })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Endereço</label>
                <textarea
                  value={settings.empresa.endereco}
                  onChange={(e) => setSettings({
                    ...settings,
                    empresa: { ...settings.empresa, endereco: e.target.value }
                  })}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Notificações</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email de Vendas</label>
                  <p className="text-sm text-gray-500">Receber notificações de novas vendas</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notificacoes.emailVendas}
                  onChange={(e) => setSettings({
                    ...settings,
                    notificacoes: { ...settings.notificacoes, emailVendas: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email de Clientes</label>
                  <p className="text-sm text-gray-500">Receber notificações de novos clientes</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notificacoes.emailClientes}
                  onChange={(e) => setSettings({
                    ...settings,
                    notificacoes: { ...settings.notificacoes, emailClientes: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email de Relatórios</label>
                  <p className="text-sm text-gray-500">Receber relatórios por email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notificacoes.emailRelatorios}
                  onChange={(e) => setSettings({
                    ...settings,
                    notificacoes: { ...settings.notificacoes, emailRelatorios: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Notificações Push</label>
                  <p className="text-sm text-gray-500">Receber notificações no navegador</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notificacoes.pushNotifications}
                  onChange={(e) => setSettings({
                    ...settings,
                    notificacoes: { ...settings.notificacoes, pushNotifications: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sistema */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Sistema</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tema</label>
                <select
                  value={settings.sistema.tema}
                  onChange={(e) => setSettings({
                    ...settings,
                    sistema: { ...settings.sistema, tema: e.target.value }
                  })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="claro">Claro</option>
                  <option value="escuro">Escuro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Idioma</label>
                <select
                  value={settings.sistema.idioma}
                  onChange={(e) => setSettings({
                    ...settings,
                    sistema: { ...settings.sistema, idioma: e.target.value }
                  })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fuso Horário</label>
                <select
                  value={settings.sistema.timezone}
                  onChange={(e) => setSettings({
                    ...settings,
                    sistema: { ...settings.sistema, timezone: e.target.value }
                  })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                  <option value="America/New_York">Nova York (GMT-5)</option>
                  <option value="Europe/London">Londres (GMT+0)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Backup Automático</label>
                  <p className="text-sm text-gray-500">Fazer backup diário dos dados</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.sistema.backupAutomatico}
                  onChange={(e) => setSettings({
                    ...settings,
                    sistema: { ...settings.sistema, backupAutomatico: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Salvar Configurações</span>
        </button>
      </div>
    </div>
  )
}
