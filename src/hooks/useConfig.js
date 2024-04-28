import { useState } from 'react';
import LocalStorageService from '../lib/LocalStorage';
import prompts from '../config/prompts';

const useConfig = () => {
  const [config, setConfig] = useState(() => {
    const storedConfig = LocalStorageService.get('config');
    return storedConfig || {
      model: 'gpt-3.5-turbo',
      apiKey: '',
      startPrompt: prompts.startPrompt,
      topicsPrompt: prompts.topicsPrompt,
      elaboratePrompt: prompts.elaboratePrompt,
    };
  });

  const saveConfig = (newConfig) => {
    setConfig(newConfig);
    LocalStorageService.save('config', newConfig);
  };

  const resetConfig = () => {
    const defaultConfig = {
      model: 'gpt-3.5-turbo',
      apiKey: '',
      startPrompt: prompts.startPrompt,
      topicsPrompt: prompts.topicsPrompt,
      elaboratePrompt: prompts.elaboratePrompt,
    };
    setConfig(defaultConfig);
    LocalStorageService.remove('config');
  };

  const getField = (fieldName) => {
    return config[fieldName];
  };

  const resetField = (fieldName) => {
    if (fieldName === 'model') {
      setConfig({ ...config, model: 'gpt-3.5-turbo' });
    } else if (fieldName === 'apiKey') {
      setConfig({ ...config, apiKey: '' });
    } else if (fieldName === 'startPrompt') {
      setConfig({ ...config, startPrompt: prompts.startPrompt });
    } else if (fieldName === 'topicsPrompt') {
      setConfig({ ...config, topicsPrompt: prompts.topicsPrompt });
    } else if (fieldName === 'elaboratePrompt') {
      setConfig({ ...config, elaboratePrompt: prompts.elaboratePrompt });
    }
  };

  return { config, saveConfig, resetConfig, getField, resetField };
};

export default useConfig;
