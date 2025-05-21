import { useState } from 'react';
import { getIcon } from '../utils/iconUtils';
import { toast } from 'react-toastify';

const Clients = () => {
  // Mock data for clients
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Modern Living Spaces',
      contact: 'John Williams',
      email: 'john@modernliving.com',
      phone: '(555) 123-4567',
      projects: 3
    },
    {
      id: 2,
      name: 'Greenfield Residence',
      contact: 'Sarah Johnson',
      email: 'sarah@greenfield.com',
      phone: '(555) 234-5678',
      projects: 1
    },
    {
      id: 3,
      name: 'Urban Loft Designs',
      contact: 'Michael Brown',
      email: 'michael@urbanloft.com',
      phone: '(555) 345-6789',
      projects: 2
    },
    {
      id: 4,
      name: 'Coastal Home Renovations',
      contact: 'Emily Davis',
      email: 'emily@coastalhome.com',
      phone: '(555) 456-7890',
      projects: 4
    },
    {
      id: 5,
      name: 'Elegant Interiors Co.',
      contact: 'Robert Smith',
      email: 'robert@elegantinteriors.com',
      phone: '(555) 567-8901',
      projects: 2
    }
  ]);

  // Get icons
  const PlusIcon = getIcon('plus');
  const SearchIcon = getIcon('search');
  const UserPlusIcon = getIcon('user-plus');

  const viewClient = (id) => {
    toast.info(`Viewing client ${id}`);
  };

  const editClient = (id) => {
    toast.info(`Editing client ${id}`);
  };

  const deleteClient = (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== id));
      toast.success('Client deleted successfully');
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold">Clients</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              placeholder="Search clients..."
              className="form-input pl-10"
            />
          </div>
          <button className="btn btn-primary flex items-center">
            <UserPlusIcon className="w-5 h-5 mr-2" />
            Add Client
          </button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-700">
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Client</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Contact Person</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Email</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Phone</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Projects</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                  <td className="py-3 font-medium">{client.name}</td>
                  <td className="py-3">{client.contact}</td>
                  <td className="py-3">{client.email}</td>
                  <td className="py-3">{client.phone}</td>
                  <td className="py-3">{client.projects}</td>
                  <td className="py-3">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => viewClient(client.id)}
                        className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => editClient(client.id)}
                        className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteClient(client.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Clients;