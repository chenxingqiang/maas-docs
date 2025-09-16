#!/usr/bin/env node
/**
 * 文档测试脚本
 * 检查文档的完整性和质量
 */

const fs = require('fs');
const path = require('path');

class DocsTester {
  constructor() {
    this.issues = [];
    this.stats = {
      totalFiles: 0,
      totalWords: 0,
      totalLines: 0,
      modules: 0,
      submodules: 0
    };
  }

  /**
   * 检查文件是否存在必需的结构
   */
  checkFileStructure(filePath, content) {
    const issues = [];
    const fileName = path.basename(filePath, '.md');

    // 检查标题
    if (!content.match(/^#\s+/m)) {
      issues.push('缺少主标题');
    }

    // 检查README文件
    if (fileName === 'README') {
      if (!content.includes('## 📋') && !content.includes('## 概述')) {
        issues.push('README文件缺少概述部分');
      }
    }

    // 检查技术实现部分
    if (content.includes('技术实现') && !content.includes('### 前端技术栈')) {
      issues.push('技术实现部分缺少前端技术栈');
    }

    return issues;
  }

  /**
   * 检查文档质量
   */
  checkQuality(filePath, content) {
    const issues = [];
    const lines = content.split('\n');
    
    // 检查空行
    let emptyLines = 0;
    for (const line of lines) {
      if (line.trim() === '') {
        emptyLines++;
      }
    }
    
    if (emptyLines / lines.length > 0.3) {
      issues.push('空行过多，可能影响阅读体验');
    }

    // 检查代码块
    const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
    if (codeBlocks.length === 0 && content.includes('技术实现')) {
      issues.push('技术实现部分缺少代码示例');
    }

    // 检查链接
    const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
    if (links.length === 0 && !filePath.includes('README')) {
      issues.push('缺少相关链接');
    }

    return issues;
  }

  /**
   * 扫描文件
   */
  scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      const words = content.split(/\s+/).length;

      this.stats.totalFiles++;
      this.stats.totalLines += lines.length;
      this.stats.totalWords += words;

      // 检查文件结构
      const structureIssues = this.checkFileStructure(filePath, content);
      structureIssues.forEach(issue => {
        this.issues.push({
          type: 'structure',
          file: filePath,
          issue: issue
        });
      });

      // 检查文档质量
      const qualityIssues = this.checkQuality(filePath, content);
      qualityIssues.forEach(issue => {
        this.issues.push({
          type: 'quality',
          file: filePath,
          issue: issue
        });
      });

      // 统计模块
      if (filePath.includes('modules') && path.basename(filePath) === 'README.md') {
        this.stats.modules++;
      } else if (filePath.includes('modules') && path.basename(filePath) !== 'README.md') {
        this.stats.submodules++;
      }

    } catch (error) {
      this.issues.push({
        type: 'error',
        file: filePath,
        issue: `读取文件失败: ${error.message}`
      });
    }
  }

  /**
   * 扫描目录
   */
  scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        this.scanDirectory(fullPath);
      } else if (file.endsWith('.md')) {
        this.scanFile(fullPath);
      }
    }
  }

  /**
   * 生成报告
   */
  generateReport() {
    console.log('📊 文档质量报告');
    console.log('='.repeat(60));
    console.log(`📁 总文件数: ${this.stats.totalFiles}`);
    console.log(`📝 总行数: ${this.stats.totalLines.toLocaleString()}`);
    console.log(`📖 总字数: ${this.stats.totalWords.toLocaleString()}`);
    console.log(`🏗️ 模块数: ${this.stats.modules}`);
    console.log(`🔧 子模块数: ${this.stats.submodules}`);
    console.log('='.repeat(60));

    if (this.issues.length === 0) {
      console.log('✅ 所有文档都符合质量标准！');
      return true;
    }

    console.log(`❌ 发现 ${this.issues.length} 个问题:`);
    
    const issuesByType = this.issues.reduce((acc, issue) => {
      acc[issue.type] = acc[issue.type] || [];
      acc[issue.type].push(issue);
      return acc;
    }, {});

    Object.entries(issuesByType).forEach(([type, issues]) => {
      console.log(`\n📋 ${type.toUpperCase()} 问题 (${issues.length}个):`);
      issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue.file}`);
        console.log(`     ${issue.issue}`);
      });
    });

    return false;
  }

  /**
   * 运行测试
   */
  run() {
    console.log('🚀 开始文档质量检查...');
    
    // 扫描docs目录
    if (fs.existsSync('docs')) {
      this.scanDirectory('docs');
    }
    
    // 扫描根目录的Markdown文件
    const rootFiles = fs.readdirSync('.').filter(file => file.endsWith('.md'));
    rootFiles.forEach(file => this.scanFile(file));
    
    const isPassed = this.generateReport();
    process.exit(isPassed ? 0 : 1);
  }
}

// 运行测试
if (require.main === module) {
  const tester = new DocsTester();
  tester.run();
}

module.exports = DocsTester;
